import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "consumer-orchestrator",
    brokers: [`192.168.1.227:9092`],
    retry: {
        initialRetryTime: 1000,
        retries: 10,
    },
});

export default kafka;
