import UserSchema from "../models/user";
import kafka from "../config/kafka";

const producer = kafka.producer();

const adduser = async (email: string) => {
    let user = await UserSchema.findOne({
        email: email,
    });

    if (!user) {
        user = await UserSchema.create({ email: email });
    } else {
        user = await UserSchema.findOneAndUpdate(
            { email: email },
            { new: false }
        );
    }

    try {
        await producer.connect();
        console.log("adduser: " + JSON.stringify(user));
        await producer.send({
            topic: "userdata",
            messages: [{ value: JSON.stringify(user) }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default adduser;
