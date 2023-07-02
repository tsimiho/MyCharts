import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        default: undefined,
    },
    quotas: {
        type: Number,
        required: false,
        default: 5,
    },
    new: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
    diagrams: {
        type: [
            {
                DiagramID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                Type: {
                    type: String,
                    required: true,
                },
                Name: {
                    type: String,
                    required: true,
                },
                Created_On: {
                    type: Date,
                    required: true,
                },
            },
        ],
        required: false,
        default: [],
    },
});

export default mongoose.model("UserSchema", UserSchema);
