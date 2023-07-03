import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const request = async (req: Request, res: Response) => {
    const { type, id, action } = req.params;

    console.log(type, id, action);

    try {
        await producer.connect();

        const data = {
            id,
            action,
        };

        await producer.send({
            topic: type + "_request",
            messages: [{ value: JSON.stringify(data) }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default request;
