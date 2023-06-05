import { Schema } from "mongoose";
import LineChartSchema from "../models/linechart";

const returnDiagram = async (diagram_id: Schema.Types.ObjectId) => {
    const diagram = await LineChartSchema.findOne({
        _id: diagram_id,
    });

    if (diagram) {
        return diagram;
    }
};

export default returnDiagram;
