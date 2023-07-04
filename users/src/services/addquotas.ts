import UserSchema from "../models/user";
import kafka from "../config/kafka";

const producer = kafka.producer();

const addquotas = async (email: string, quotas: string) => {
    const user = await UserSchema.findOne({
        email: email,
    });
    if (user) {
        if (user.quotas>=0) {
            const q = user.quotas + quotas;
            await UserSchema.findOneAndUpdate({ email: email }, { quotas: q });

            try {
                await producer.connect();
                await producer.send({
                    topic: "quotas_added",
                    messages: [{ value: q.toString() }],
                });

                console.log("ok");
            } catch (error) {
                console.log(
                    `[kafka-producer] ${(error as Error).message}`,
                    error
                );
            }
        }
    }
};

export default addquotas;
