import LineChartSchema from "../models/linechart";
import kafka from "../config/kafka";
import { Message } from "kafkajs"

const storeDiagram = async (username: string, data: object) => {
    const diagram = await LineChartSchema.create(data);

    const producer = kafka.producer();

    try {
        await producer.connect();

        await producer.send({
            topic: "create_linechart",
            messages: [{key: }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default storeDiagram;
