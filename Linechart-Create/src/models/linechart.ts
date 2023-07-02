import mongoose from "mongoose";

const LineChartSchema = new mongoose.Schema({
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

export default mongoose.model("LineChartSchema", LineChartSchema);
