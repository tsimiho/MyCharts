import UserSchema from "../models/user"
import kafka from "../config/kafka";

const producer = kafka.producer();

const adduser = async (email: string) => {
    let user = await UserSchema.findOne({
        email: email
    })

    if (!user) {
        user = await UserSchema.create(email);
    }
    try {
        await producer.connect();

        await producer.send({
            topic: "userdata",
            messages: [{ value: JSON.stringify(user) }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default adduser;
