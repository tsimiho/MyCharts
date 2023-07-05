import mongoose from "mongoose";

const BasicColumnSchema = new mongoose.Schema({
    chart: {
        type: String,
        default: "column",
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
    xAxis: {
        categories: {
            type: [String],
            default: [],
        },
        crosshair: {
            type: Boolean,
            default: true,
        },
    },
    yAxis: {
        min: {
            type: Number,
            default: 0,
        },
        title: {
            text: {
                type: String,
                default: "",
            },
        },
    },
    plotOptions: {
        column: {
            pointPadding: {
                type: Number,
                default: 0.2,
            },
            borderWidth: {
                type: Number,
                default: 0,
            },
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

export default mongoose.model("BasicColumnSchema", BasicColumnSchema);
