import json
import paho.mqtt.client as mqtt
import time
import requests
from paho.mqtt.client import Client
from pyexpat.errors import XML_ERROR_RESERVED_PREFIX_XML

URL = "http://localhost:3000"
token = ''
headers = {
    'Authorization': f'Bearer {token}'
}



def on_message(client, userdata, message):
    try:
        print(f"Received message: {message.payload.decode('utf-8')}")
        message_json = json.loads(message.payload.decode("utf-8"))

        if message_json.get('operation') == 'goal':
            print(f"{message_json['operation']} => {message_json['player']['name']} {message_json['team']['name']}")
            body = {
                'match': message_json['match'],
                'team': message_json['team']['_id'],
                'player': message_json['player']['_id']
            }
            response = requests.post(f"{URL}/goal", json=body, headers=headers)
            print(f"Goal response status: {response.status_code}")

        elif message_json.get('operation') == 'card':
            print(f"{message_json['operation']} => {message_json['player']['name']} {message_json['team']['name']}")
            body = {
                'match': message_json['match'],
                'player': message_json['player']['_id'],
                'card': message_json['card']
            }
            response = requests.post(f"{URL}/card", json=body, headers=headers)
            print(f"Card response status: {response.status_code}")

    except Exception as e:
        print(f"Error processing message: {e}")




client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

client.on_message = on_message
client.will_set("MATCH", payload=None, qos=0, retain=False)

client.connect('mqtt.eclipseprojects.io')


# client.connect("mqtt.eclipseprojects.io")
client.subscribe("MATCH/#",qos=1)


# Start the MQTT loop in a non-blocking mode
client.loop_start()

# Run for a long time to process incoming messages
try:
    while True:
        time.sleep(1)  # Or adjust this to the required period for your use case
except KeyboardInterrupt:
    print("Shutting down MQTT client.")
    client.loop_stop()
    client.disconnect()
