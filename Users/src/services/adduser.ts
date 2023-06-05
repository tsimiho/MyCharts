import UserSchema from "../models/user"

const adduser = async (email: string) => {
    const user = UserSchema.findOne({
        email: email
    })

    if (!user) {
        UserSchema.create(email);
    }
};

export default adduser;
