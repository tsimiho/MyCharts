import mongoose from "mongoose";

const LineChartSchema = new mongoose.Schema({
    chart: {
        type: {
            type: String,
            default: "line",
        },
        height: {
            type: String,
            default: "100%",
        },
    },
    title: {
        type: {
            text: {
                type: String,
                default: "",
            },
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
        },
        categories: {
            type: [String],
            default: null,
        },
    },
    legend: {
        layout: {
            type: String,
            default: "vertical",
        },
        align: {
            type: String,
            default: "right",
        },
        verticalAlign: {
            type: String,
            default: "middle",
        },
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
});

export default mongoose.model("LineChartSchema", LineChartSchema);
