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
        type: [{
            Type: {
                type: String,
                required: true
            },
            Name: {
                type: String,
                required: true
            },
            Created_On: {
                type: Date,
                required: true
            }
        }],
        required: false,
        default: []
    }
});

export default mongoose.model("UserSchema", UserSchema);
