import BasicColumnSchema from "../models/basicColumn";

const addbasicColumn = async (data: object) => {
    const diagram = await BasicColumnSchema.create(data);
};

export default addbasicColumn;
