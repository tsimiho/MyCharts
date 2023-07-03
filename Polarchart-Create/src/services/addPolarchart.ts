import PolarChartSchema from "../models/polarchart";

const addpolarchart = async (data: object) => {
    const diagram = await PolarChartSchema.create(data);
};

export default addpolarchart;
