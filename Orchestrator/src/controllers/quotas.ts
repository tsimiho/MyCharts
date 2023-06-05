import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const quotas = async (req: Request, res: Response) => {
    try {
        console.log(req.body.email+" "+req.body.quotas)
        const { email, quotas } = req.body;

        const message = JSON.stringify({
            email,
            quotas,
        });

        await producer.connect();
        await producer.send({
            topic: "addquotas",
            messages: [{value: message}]
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default quotas;