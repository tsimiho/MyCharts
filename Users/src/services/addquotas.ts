import UserSchema from "../models/user"
import kafka from "../config/kafka";

const addquotas = async (email: string, quotas: string) => {
    let user = await UserSchema.findOne({
        email: email
    })
    if (user) {
        // Add the quotas value to the existing tokens value
        if(user.tokens) user.tokens += parseInt(quotas,10);
  
        // Save the updated user object
        await user.save();
    }
};

export default addquotas;
