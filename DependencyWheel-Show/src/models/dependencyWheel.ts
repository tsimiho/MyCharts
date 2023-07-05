import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DependencyWheelSchema = new mongoose.Schema({
    chart: {
        type: {
            type: String,
            default: "dependencywheel",
        },
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
                type: [Schema.Types.Mixed],
                default: [],
            },
            linkWeight: {
                type: Number,
                default: 5,
            },
            centeredLinks: {
                type: Boolean,
                default: true,
            },
            dataLabels: {
                color: {
                    type: String,
                    default: "",
                },
                format: {
                    type: String,
                    default: "",
                },
                nodeFormat: {
                    type: String,
                    default: "",
                },
            },
        },
    ],
});

export default mongoose.model("DependencyWheelSchema", DependencyWheelSchema);
