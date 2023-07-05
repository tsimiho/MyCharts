import mongoose from "mongoose";

const DependencyWheelSchema = new mongoose.Schema({
    chart: {
        type: String,
        default: "dependencywheel",
    },
    title: {
        text: {
            type: String,
            default: "Title",
        },
    },
    subtitle: {
        text: {
            type: String,
            default: "Subtitle",
        },
    },
    accessibility: {
        point: {
            valueDescriptionFormat: {
                type: String,
                default: "",
            },
        },
    },
    series: [
        {
            keys: {
                type: [String],
                default: [],
            },
            data: {
                type: [[String, String, Number]],
                default: [],
            },
            type: {
                type: String,
                default: "",
            },
            name: {
                type: String,
                default: "",
            },
            dataLabels: {
                color: {
                    type: String,
                    default: "",
                },
                style: {
                    textOutline: {
                        type: String,
                        default: "",
                    },
                },
                textPath: {
                    enabled: {
                        type: Boolean,
                        default: true,
                    },
                },
                distance: {
                    type: Number,
                    default: 0,
                },
            },
            size: {
                type: String,
                default: "",
            },
        },
    ],
});

export default mongoose.model("DependencyWheelSchema", DependencyWheelSchema);
