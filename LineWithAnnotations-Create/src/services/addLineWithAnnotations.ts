import LineWithAnnotationsSchema from "../models/lineWithAnnotations";

const addLineWithAnnotations = async (data: object) => {
    const diagram = await LineWithAnnotationsSchema.create(data);
};

export default addLineWithAnnotations;
