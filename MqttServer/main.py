import paho.mqtt.publish as publish
import time
import random

mqtt_broker = "mosquitto"
mqtt_port = 1883
topic = "realtime_data_topic"

while True:
    # Fetch real-time data from your source
    data_value = random.randint(1, 100)

    # Publish the data to the MQTT topic
    publish.single(topic, str(data_value), hostname=mqtt_broker, port=mqtt_port)

    time.sleep(1)  # Adjust the delay based on your requirements
