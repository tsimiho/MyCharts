import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        default: undefined,
    },
    tokens: {
        type: Number,
        required: false,
        default: 5,
    },
    diagrams: {
        type: [String],
        required: false,
        default: []
    }
});

export default mongoose.model("UserSchema", UserSchema);
