"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "producer",
    brokers: ["10.31.5.74:9092"], // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
});
const producer = kafka.producer();
const linechart = async (req, res) => {
    try {
        await producer.connect();
        await producer.send({
            topic: "create_linechart",
            messages: [req.body],
        });
    }
    catch (error) {
        console.log(`[kafka-producer] ${error.message}`, error);
    }
};
exports.default = linechart;
