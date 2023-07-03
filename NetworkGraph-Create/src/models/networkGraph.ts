import mongoose from "mongoose";

const NetworkGraphSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: undefined,
    },
    title: {
        text: {
            type: String,
            default: "",
        },
    },
    subtitle: {
        text: {
            type: String,
            default: "",
        },
    },
    yAxis: {
        title: {
            text: {
                type: String,
                default: "",
            },
        },
    },
    xAxis: {
        title: {
            text: {
                type: String,
                default: "",
            },
            categories: [String],
        },
        series: [
            {
                name: {
                    type: String,
                    default: "",
                },
                data: {
                    type: [Number],
                    default: [],
                },
            },
        ],
    },
});

export default mongoose.model("NetworkGraphSchema", NetworkGraphSchema);
