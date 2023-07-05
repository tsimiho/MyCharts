import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const polarchart = async (req: Request, res: Response) => {
    console.log("polar");
    try {
        const { email, data, name } = req.body;

        const message = JSON.stringify({
            email,
            data,
        });
        console.log(message);

        await producer.connect();
        await producer.send({
            topic: "polarchart_create",
            messages: [{ key: "linechart", value: message }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default polarchart;
