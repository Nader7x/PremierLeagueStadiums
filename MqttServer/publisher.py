import paho.mqtt.client as mqtt
import time
import random
import requests

URL = "http://localhost:3000"
mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("event")
client.connect(mqttBroker)
while True:
    response = requests.get(f"{URL}/matchesLive")
    for i in range(len(response.json())):
        homeTeam = response.json()[i]["homeTeam"]
        awayTeam = response.json()[i]["awayTeam"]

#       choose random player from random team
        random_operation = random.choice(["goal"])
        random_team = random.choice([homeTeam, awayTeam])
        random_player = random.choice(random_team["squad"])
#       Publish the data to the MQTT topic
        client.publish("EVENT", str({"operation": random_operation, "player": random_player, "team": {"name": random_team["name"], "_id": random_team["_id"]}, "match": response.json()[i]["_id"]}))
        print({'operation': random_operation, 'player': random_player, 'team': {'name': random_team["name"], '_id': random_team["_id"]}, 'match': response.json()[i]['_id']})
#       Adjust the delay based on your requirements
    time.sleep(10)
