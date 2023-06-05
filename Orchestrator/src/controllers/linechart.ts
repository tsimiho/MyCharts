import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const linechart = async (req: Request, res: Response) => {
    try {
        const { username, data } = req.body;

        const message = JSON.stringify({
            username,
            data,
        });

        await producer.connect();
        await producer.send({
            topic: "create_linechart",
            messages: [{key: "linechart", value: message}]
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default linechart;
