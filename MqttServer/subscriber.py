import json
import paho.mqtt.client as mqtt
import time
import requests


def on_message(clients, userdata, message):
    json_data = message.payload.decode("utf-8").replace("'", "\"")
    message_json = json.loads(json_data)
    #   print("Received message: ", str(message.payload.decode("utf-8")))
    if message_json['operation'] == 'goal':
        print(message_json['operation'])
        body = {'match': message_json['match'], 'team': message_json['team']['_id'],
                'player': message_json['player']['_id']}
        requests.post(f"{URL}/goal", json=body)
    if message_json['operation'] == 'card':
        print(message_json['operation'])
        body = {'match': message_json['match'], 'player': message_json['player']['_id'], 'card': message_json['card']}
        requests.post(f"{URL}/card", json=body)


mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("webPage")
client.connect(mqttBroker)
URL = "http://localhost:3000"
client.loop_start()
client.subscribe("EVENT")
client.on_message = on_message
time.sleep(120)
