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

// Configure Kafka consumer
const consumer = new kafka.Consumer(
  new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
  [{ topic: 'My-topic' }]
);

// Consume messages from Kafka broker
consumer.on('message', function (message) {
  // Display the message
  console.log(message.value);
});
  
const connectDB = require("./database/connect");
require("dotenv").config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
