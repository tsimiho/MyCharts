import mongoose from "mongoose";

const LineChartSchema = new mongoose.Schema({
    chart: {
        type: String,
        default: "line" 
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
