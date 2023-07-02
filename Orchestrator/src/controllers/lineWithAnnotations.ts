import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const lineWithAnnotations = async (req: Request, res: Response) => {
    try {
        const { email, data, name } = req.body;

        const message = JSON.stringify({
            email,
            data,
        });
        console.log(message);

        await producer.connect();
        await producer.send({
            topic: "lineWithAnnotations_create",
            messages: [{ key: "linechart", value: message }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default lineWithAnnotations;
