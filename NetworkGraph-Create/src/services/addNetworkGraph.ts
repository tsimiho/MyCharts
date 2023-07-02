import NetworkGraphSchema from "../models/networkGraph";

const addnetworkGraph = async (data: object) => {
    const diagram = await NetworkGraphSchema.create(data);
};

export default addnetworkGraph;
