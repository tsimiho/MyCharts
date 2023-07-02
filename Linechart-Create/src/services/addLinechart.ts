import LineChartSchema from "../models/linechart";

const addlinechart = async (data: object) => {
    const diagram = await LineChartSchema.create(data);
};

export default addlinechart;
