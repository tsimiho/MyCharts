import mongoose from "mongoose";

const NetworkGraphSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: undefined,
    },
    labels: {
        type: [String],
        required: true,
    },
    datasets: {
        type: [
            {
                label: {
                    type: String,
                    default: "",
                },
                data: {
                    type: [Number],
                    required: true,
                },
                backgroundColor: {
                    type: String,
                    default: "rgba(0, 0, 0, 0.1)",
                },
                borderCapStyle: {
                    type: String,
                    default: "butt",
                },
                borderColor: {
                    type: String,
                    default: "rgba(0, 0, 0, 0.1)",
                },
                borderWidth: {
                    type: Number,
                    default: 1,
                },
                hoverBorderCapStyle: {
                    type: String,
                    required: false,
                },
                hoverBorderColor: {
                    type: String,
                    required: false,
                },
                pointBackgroundColor: {
                    type: String,
                    default: "rgba(0, 0, 0, 0.1)",
                },
                pointBorderColor: {
                    type: String,
                    default: "rgba(0, 0, 0, 0.1)",
                },
                pointBorderWidth: {
                    type: Number,
                    default: 1,
                },
                tension: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        required: true,
    },
});

export default mongoose.model("NetworkGraphSchema", NetworkGraphSchema);
