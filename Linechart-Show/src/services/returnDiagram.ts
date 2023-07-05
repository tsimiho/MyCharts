import mongoose from "mongoose";
import LineChartSchema from "../models/linechart";
import kafka from "../config/kafka";

const returnDiagram = async (diagram_id: string, action: string) => {
    const diagram = await LineChartSchema.findById(diagram_id);
    console.log(diagram)
    if (diagram) {
        console.log("here");
        try {
            const producer = kafka.producer();
            await producer.connect();

            const message = JSON.stringify({
                diagram,
                action,
            });
            await producer.send({
                topic: "linechart_show",
                messages: [{ value: message }],
            });
        } catch (error) {
            console.log(`[kafka-producer] ${(error as Error).message}`, error);
        }
    }
};

export default returnDiagram;
