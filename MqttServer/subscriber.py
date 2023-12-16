import json
import paho.mqtt.client as mqtt
import time
import requests

URL = "http://localhost:3000"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdjOGZiYWYyOTE4MTU3ZGM5NWNjYjAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI3MzI5ODIsImV4cCI6MzE3Mjc4NzMyOTgyfQ.XPhNQCvwkJ8LsDrvo5HJ1EhvBhKNzBucDdpZEk2k36s"
headers = {
        'Authorization': f'Bearer {token}'
    }


def on_message(clients, userdata, message):
    json_data = message.payload.decode("utf-8").replace("'", "\"")
    message_json = json.loads(json_data)
    #   print("Received message: ", str(message.payload.decode("utf-8")))
    if message_json['operation'] == 'goal':
        print(f"{message_json['operation']}=> {message_json['player']['name']} {message_json['team']['name']}")
        body = {'match': message_json['match'], 'team': message_json['team']['_id'],
                'player': message_json['player']['_id']}
        requests.post(f"{URL}/goal", json=body, headers=headers)
    if message_json['operation'] == 'card':
        print(f"{message_json['operation']}=> {message_json['player']['name']} {message_json['team']['name']}")
        body = {'match': message_json['match'], 'player': message_json['player']['_id'], 'card': message_json['card']}
        requests.post(f"{URL}/card", json=body, headers=headers)


mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("webPage")
client.connect(mqttBroker)
client.loop_start()
client.subscribe("EVENT")
client.on_message = on_message
time.sleep(1200000)
