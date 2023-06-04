import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "producer",
    brokers: ["9.31.5.74:9092"], // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
});

export default kafka;
