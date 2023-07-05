import mongoose from "mongoose";

const PolarChartSchema = new mongoose.Schema({
    chart: {
        polar: { type: Boolean, default: true },
    },
    title: {
        text: {
            type: String,
            default: "",
        },
        align: {
            type: String,
            default: "left",
        },
    },
    subtitle: {
        text: {
            type: String,
            default: "",
        },
    },
    pane: {
        startAngle: {
            type: Number,
            default: 0,
        },
        endAngle: {
            type: Number,
            default: 360,
        },
    },
    xAxis: {
        tickInterval: {
            type: Number,
            default: 45,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 360,
        },
        labels: {
            format: {
                type: String,
                default: "{value}°",
            },
        },
    },
    yAxis: {
        min: { type: Number, default: 0 },
    },
    plotOptions: {
        series: {
            pointStart: {
                type: Number,
                default: 0,
            },
            pointInterval: {
                type: Number,
                default: 45,
            },
        },
        column: {
            pointPadding: {
                type: Number,
                default: 0,
            },
            groupPadding: {
                type: Number,
                default: 0,
            },
        },
    },
    series: [
        {
            type: {
                type: String,
                default: "",
            },
            name: {
                type: String,
                default: "",
            },
            data: {
                type: [Number],
                default: [],
            },
            pointPlacement: {
                type: String,
                default: "between",
            },
        },
    ],
});

export default mongoose.model("PolarChartSchema", PolarChartSchema);
