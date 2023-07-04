import { Request, Response } from "express";
import kafka from "../config/kafka";

const producer = kafka.producer();

const login = async (req: Request, res: Response) => {
    console.log(req.body.email);
    try {
        await producer.connect();

        await producer.send({
            topic: "login",
            messages: [{ value: req.body.email }],
        });

        console.log("success");
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default login;
