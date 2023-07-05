import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "consumer-dependencyWheel-create",
    brokers: [`192.168.1.227:9092`],
    retry: {
        initialRetryTime: 1000,
        retries: 10,
    },
});

export default kafka;
