import LineChartSchema from "../models/linechart";

const addlinechart = async (data: object) => {
    console.log(data)
    const diagram = await LineChartSchema.create(data);
};

export default addlinechart;
