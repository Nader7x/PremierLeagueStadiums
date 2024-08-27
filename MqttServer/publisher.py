import paho.mqtt.client as mqtt
import time
import random
import requests

token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdjOGZiYWYyOTE4MTU3ZGM5NWNjYjAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI2Njk2NjYsImV4cCI6MzE3Mjc4NjY5NjY2fQ.EXPvjDuNXZAk4oZ123MEtmm9J6HMPQ9bVZoWLudRL8s"

URL = "http://localhost:3000"
mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("event")
client.connect(mqttBroker)
headers = {
    'Authorization': f'Bearer {token}',
}
while True:
    response = requests.get(f"{URL}/matchesLive", headers=headers)
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
        client.publish("EVENT", str({"operation": random_operation, "player": random_player, "team": {"name": random_team["name"], "_id": random_team["_id"]}, "match": response.json()[i]["_id"], "card": card_color}))
        print({'operation': random_operation, 'player': random_player, 'team': {'name': random_team["name"], '_id': random_team["_id"]}, 'match': response.json()[i]['_id'], 'card': card_color})
#       Adjust the delay based on your requirements
    time.sleep(random.randint(10, 15))
