import { Kafka } from "kafkajs"

const kafka = new Kafka({
   clientId: "consumer",
   brokers: ["10.31.5.74:9092"] // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
})


export default kafka;