import { Kafka } from "kafkajs"

const kafka = new Kafka({
   clientId: "producer",
   brokers: ["10.31.5.74:9092"]  // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
})


const producer = kafka.producer();

const run = async () => {
    await producer.connect()
    var i = 0
    while (true) {
        await producer.send({
            topic: "test_topic",
            messages: [
                { key: i.toString(), value: Math.random().toString() }
            ]
        })
        ++i
    }
}

run().catch(e => console.error(`[kafka-producer] ${e.message}`, e))
