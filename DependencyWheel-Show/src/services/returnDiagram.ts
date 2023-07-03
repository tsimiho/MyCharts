import mongoose from "mongoose";
import DependencyWheelSchema from "../models/dependencyWheel";
import kafka from "../config/kafka";

const returnDiagram = async (
    diagram_id: mongoose.Schema.Types.ObjectId,
    action: string
) => {
    const diagram = await DependencyWheelSchema.findOne({
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
                topic: "dependencyWheel_show",
                messages: [{ value: message }],
            });
        } catch (error) {
            console.log(`[kafka-producer] ${(error as Error).message}`, error);
        }
    }
};

export default returnDiagram;
