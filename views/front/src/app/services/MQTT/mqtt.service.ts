import { Injectable } from '@angular/core';
import mqtt from 'mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client!: mqtt.MqttClient;
  // public first = true;
  public receivedJson: any = {};
  public swich  = false;

  constructor() {
    this.connectToBroker();
  }

  private connectToBroker(): void {
    const brokerUrl = 'ws://mqtt.eclipseprojects.io:80/mqtt';
    this.client = mqtt.connect(brokerUrl);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.client.subscribe('EVENT');
    });

    this.client.on('message', (topic, message) => {
      // if(this.first === true){
      //   this.first = false;
      //   return;
      // }
      this.swich = true;
      const jsonString = `${message}`;
      const validJsonString = jsonString.replace(/'/g, '"');

      // Parse the string as JSON
      const jsonData = JSON.parse(validJsonString);
      
      this.receivedJson = jsonData;
      this.handleMessage(jsonData);
    });
  }

  private handleMessage(body: any): void {
    console.log('Handling message:', body);
    if (body.operation === 'goal') {
      console.log('Goal:', body);
      // Handle goal logic
    } else if (body.operation === 'card') {
      console.log('Card:', body);
      // Handle card logic
    }
  }
}
