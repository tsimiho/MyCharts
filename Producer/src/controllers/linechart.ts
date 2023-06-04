import { Request, Response } from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "producer",
    brokers: ["10.31.5.74:9092"], // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
});

const producer = kafka.producer();

const linechart = async (req: Request, res: Response) => {
    try {
        await producer.connect();

        await producer.send({
            topic: "create_linechart",
            messages: [req.body],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default linechart;
