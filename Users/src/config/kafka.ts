import { Kafka } from "kafkajs"

const kafka = new Kafka({
   clientId: "consumer",
   brokers: ["localhost:9092"] // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
})


export default kafka;