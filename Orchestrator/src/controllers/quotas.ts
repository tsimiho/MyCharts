import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const quotas = async (req: Request, res: Response) => {
    console.log(req.body.email+" "+req.body.email)
    try {
        await producer.connect();

        await producer.send({
            topic: "addquotas",
            messages: [{ value: req.body.email },
                       { value: req.body.quotas }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default quotas;