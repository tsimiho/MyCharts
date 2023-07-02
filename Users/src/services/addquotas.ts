import UserSchema from "../models/user";

const addquotas = async (email: string, quotas: string) => {
    const user = await UserSchema.findOne({
        email: email,
    });
    if (user) {
        if (user.quotas) {
            const q = user.quotas + quotas;
            await UserSchema.findOneAndUpdate({ email: email }, { quotas: q });
        }
    }
};

export default addquotas;
