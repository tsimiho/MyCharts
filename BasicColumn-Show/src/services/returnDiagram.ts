import mongoose from "mongoose";
import BasicColumnSchema from "../models/basicColumn";
import kafka from "../config/kafka";

const returnDiagram = async (
    diagram_id: mongoose.Schema.Types.ObjectId,
    action: string
) => {
    const diagram = await BasicColumnSchema.findOne({
        _id: diagram_id,
    });

    if (diagram) {
        try {
            const producer = kafka.producer();
            await producer.connect();

            const message = JSON.stringify({
                diagram,
                action,
            });
            await producer.send({
                topic: "basicColumn_show",
                messages: [{ value: message }],
            });
        } catch (error) {
            console.log(`[kafka-producer] ${(error as Error).message}`, error);
        }
    }
};

export default returnDiagram;