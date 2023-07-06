import mongoose from "mongoose";

const LineWithAnnotationsSchema = new mongoose.Schema({
    chart: {
        type: String,
        default: "area",
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
        align: {
            type: String,
            default: "left",
        },
    },
    caption: {
        text: {
            type: String,
            default: "",
        },
    },
    annotations: [
        {
            draggable: String,
            labelOptions: {
                backgroundColor: String,
                verticalAlign: String,
                y: Number,
            },
            labels: [
                {
                    point: {
                        xAxis: Number,
                        yAxis: Number,
                        x: Number,
                        y: Number,
                    },
                    text: String,
                },
            ],
        },
    ],
    xAxis: {
        labels: {
            format: {
                type: String,
                default: "",
            },
        },
        minRange: Number,
        title: {
            text: {
                type: String,
                default: "",
            },
        },
        accessibility: {
            rangeDescription: {
                type: String,
                default: "",
            },
        },
    },
    yAxis: {
        startOnTick: Boolean,
        endOnTick: Boolean,
        maxPadding: Number,
        title: {
            text: {
                type: String,
                default: "",
            },
        },
        labels: {
            format: {
                type: String,
                default: "",
            },
        },
        accessibility: {
            description: {
                type: String,
                default: "",
            },
            rangeDescription: {
                type: String,
                default: "",
            },
        },
    },
    series: [
        {
            data: {
                type: [Number, Number],
                default: [],
            },
            lineColor: {
                type: String,
                default: "",
            },
            color: {
                type: String,
                default: "",
            },
            fillOpacity: {
                type: Number,
                default: 0.5,
            },
            name: {
                type: String,
                default: "",
            },
            marker: {
                enabled: {
                    type: Boolean,
                    default: false,
                },
            },
            threshold: Number,
        },
    ],
});

export default mongoose.model(
    "LineWithAnnotationsSchema",
    LineWithAnnotationsSchema
);
