const express = require('express');
const app = express();
const kafka = require('kafka-node');

const user = new kafka.KafkaClient({
  kafkaHost: 'localhost:9092'
});

user.on('ready', () => {
  console.log('Kafka Connected');
});

user.on('error', (error) => {
  console.error('Error connecting to Kafka:', error);
});

const producer = new kafka.Producer(user);

const connectDB = require("./database/connect");
require("dotenv").config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/upload', (req, res) => {
  const payload = [
    {
      topic: 'My-topic',
      messages: 'Diagram uploaded'
    }
  ];

  producer.send(payload, (error, data) => {
    if (error) {
      console.error('Error in publishing message:', error);
      res.status(500).json({ error: 'Error publishing message' });
    } else {
      console.log('Message successfully published:', data);
      res.json({ message: 'Message published successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
