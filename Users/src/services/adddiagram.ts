import mongoose from "mongoose";
import UserSchema from "../models/user";

const add_diagram = async (
    email: string,
    id: mongoose.Types.ObjectId,
    name: string
) => {
    const user = await UserSchema.findOne({
        email: email,
    });

    console.log(name);

    if (user) {
        const quotas = user.quotas;
        const diagrams = user.diagrams;

        if (quotas && diagrams) {
            diagrams.push({
                DiagramID: id,
                Type: "Linechart",
                Name: name,
                Created_On: new Date(),
            });

            await UserSchema.findOneAndUpdate(
                { email: email },
                { quotas: quotas - 1, diagrams: diagrams }
            );
        }
    } else {
        await UserSchema.create({
            email: email,
            diagrams: {
                DiagramID: id,
                Type: "Linechart",
                Name: name,
                Created_On: new Date(),
            },
        });
    }
};

export default add_diagram;
