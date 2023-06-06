import UserSchema from "../models/user";
import kafka from "../config/kafka";

const addquotas = async (email: string, quotas: string) => {
    const user = await UserSchema.findOne({
        email: email,
    });
    if (user) {
        if (user.quotas){
            const q = user.quotas + parseInt(quotas, 10);
            await UserSchema.findOneAndUpdate({ email: email }, { quotas: q });
        }
    }
};

export default addquotas;
