import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        default: undefined,
    },
    tokens: {
        type: Number,
        default: 5,
    },
});

export default mongoose.model("UserSchema", UserSchema);
