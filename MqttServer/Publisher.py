import paho.mqtt.client as mqtt
import time
import random
import requests


def on_publish(client, userdata, mid, reason_code, properties):
    # reason_code and properties will only be present in MQTTv5. It's always unset in MQTTv3
    try:
        userdata.remove(mid)
    except KeyError:
        print("on_publish() is called with a mid not present in unacked_publish")
        print("This is due to an unavoidable race-condition:")
        print("* publish() return the mid of the message sent.")
        print("* mid from publish() is added to unacked_publish by the main thread")
        print("* on_publish() is called by the loop_start thread")
        print("While unlikely (because on_publish() will be called after a network round-trip),")
        print(" this is a race-condition that COULD happen")
        print("")
        print("The best solution to avoid race-condition is using the msg_info from publish()")
        print("We could also try using a list of acknowledged mid rather than removing from pending list,")
        print("but remember that mid could be re-used !")


URL = "http://localhost:3000"

unacked_publish = set()
mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_publish = on_publish
mqttc.user_data_set(unacked_publish)
mqttc.connect("mqtt.eclipseprojects.io")
mqttc.loop_start()

token = ""
headers = {
    'Authorization': f'Bearer {token}',
}

while True:
    response = requests.get(f"{URL}/matchesLive")
    print(len(response.json()))
    for i in range(len(response.json())):
        homeTeam = response.json()[i]["homeTeam"]
        awayTeam = response.json()[i]["awayTeam"]

        #       choose random player from random team
        random_operation = random.choice(["goal", "card"])
        card_color = ''
        if random_operation == "card":
            card_color = random.choice(['yellow', 'red', 'yellow', 'yellow'])
        random_team = random.choice([homeTeam, awayTeam])
        random_player = random.choice(random_team["squad"])
        #       Publish the data to the MQTT topic
        mqttc.publish("EVENT", str({"operation": random_operation, "player": random_player,
                                    "team": {"name": random_team["name"], "_id": random_team["_id"]},
                                    "match": response.json()[i]["_id"], "card": card_color}))

        print({'operation': random_operation, 'player': random_player,
               'team': {'name': random_team["name"], '_id': random_team["_id"]}, 'match': response.json()[i]['_id'],
               'card': card_color})
    #       Adjust the delay based on your requirements
    time.sleep(random.randint(10, 15))
