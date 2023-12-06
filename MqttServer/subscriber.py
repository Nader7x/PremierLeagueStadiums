import paho.mqtt.client as mqtt
import time


def on_message(clients, userdata, message):
    print("Received message: ", str(message.payload.decode("utf-8")))


mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("webPage")
client.connect(mqttBroker)

client.loop_start()
client.subscribe("EVENT")
client.on_message = on_message
time.sleep(30)
