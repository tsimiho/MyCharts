const DependencyWheelSchema = {
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
                type: [String],
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
};
  
export default DependencyWheelSchema;