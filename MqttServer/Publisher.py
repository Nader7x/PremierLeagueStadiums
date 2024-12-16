import paho.mqtt.client as mqtt
import time
import random
import requests


token=''
URL = "http://localhost:3000"
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

client.connect("mqtt.eclipseprojects.io")
client.loop_start()  # Start the MQTT loop in a non-blocking way

headers = {
    'Authorization': f'Bearer {token}',
}
while True:
    response = requests.get(f"{URL}/matchesLive")
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
        # Publish the data to the MQTT topic
        message = {
            "operation": random_operation,
            "player": random_player,
            "team": {"name": random_team["name"], "_id": random_team["_id"]},
            "match": response.json()[i]["_id"],
            "card": card_color
        }
        #       Publish the data to the MQTT topic
        (rc, mid) =  client.publish('MATCH/EVENTS', str(message),qos=1)
        print(rc,mid)

        # Send a POST request to the appropriate endpoint
        if random_operation == "goal":
            body = {
                'match': message['match'],
                'team': message['team']['_id'],
                'player': message['player']['_id']
            }
            goal_response = requests.post(f"{URL}/goal", json=body)
            print(f"Goal response status: {goal_response.status_code}")
        elif random_operation == "card":
            body = {
                'match': message['match'],
                'player': message['player']['_id'],
                'card': message['card']
            }
            card_response = requests.post(f"{URL}/card", json=body)
            print(f"Card response status: {card_response.status_code}")
        print({'operation': random_operation, 'player': random_player, 'team': {'name': random_team["name"], '_id': random_team["_id"]}, 'match': response.json()[i]['_id'], 'card': card_color})
            #       Adjust the delay based on your requirements
    time.sleep(random.randint(10, 15))