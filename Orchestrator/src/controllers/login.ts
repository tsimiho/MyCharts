import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const login = async (req: Request, res: Response) => {
    try {
        await producer.connect();

        await producer.send({
            topic: "login",
            messages: [req.body],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default login;
