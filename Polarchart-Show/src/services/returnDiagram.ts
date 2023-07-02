import mongoose from "mongoose";
import PolarChartSchema from "../models/polarchart";
import kafka from "../config/kafka";

const returnDiagram = async (diagram_id: mongoose.Schema.Types.ObjectId) => {
    const diagram = await PolarChartSchema.findOne({
        _id: diagram_id,
    });

    if (diagram) {
        try {
            const producer = kafka.producer();
            await producer.connect();

            const message = JSON.stringify({
                diagram,
            });
            await producer.send({
                topic: "polarchart_show",
                messages: [{ key: "0", value: message }],
            });
        } catch (error) {
            console.log(`[kafka-producer] ${(error as Error).message}`, error);
        }
    }
};

export default returnDiagram;
