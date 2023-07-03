import mongoose from "mongoose";

const NetworkGraphSchema = new mongoose.Schema({
    chart: {
        type: { 
		type: String, 
		default: 'networkgraph' 
	},
        height: { 
		type: String, 
		default: '100%' 
	}
    },
    title: {
        text: { 
		type: String, 
		default: "" 
	},
        align: { 
		type: String, 
		default: 'left' 
	}
    },
    subtitle: {
        text: { 
		type: String, 
		default: "" 
	},
        align: { 
		type: String, 
		default: 'left' 
	}
    },
    plotOptions: {
        networkgraph: {
            keys: { 
		type: [String], 
		default: ['from', 'to'] 
	    },
            layoutAlgorithm: {
                enableSimulation: { 
			type: Boolean, 
			default: true 
		},
                friction: { 
			type: Number, 
			default: -0.9 
		}
            }
        }
    },
    series: [{
        accessibility: {
            enabled: { 
		type: Boolean, 
		default: false 
		}
        },
        dataLabels: {
            enabled: { 
		type: Boolean, 
		default: true 
		},
            linkFormat: { 
		type: String, 
		default: '' 
		},
            style: {
                fontSize: { 
			type: String, 
			default: '0.8em' 
		},
                fontWeight: { 
			type: String, 
			default: 'normal' 
		}
            }
        },
        id: { 
		type: String, 
		default: '' 
	},
        nodes: [{
            id: String,
            marker: {
                radius: Number
            },
            color: String
        }],
        data: [[String]]
    }]
});

export default mongoose.model("NetworkGraphSchema", NetworkGraphSchema);
