import DependencyWheelSchema from "../models/dependencyWheel";

const adddependencyWheel = async (data: object) => {
    const diagram = await DependencyWheelSchema.create(data);
};

export default adddependencyWheel;
