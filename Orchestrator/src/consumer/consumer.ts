import kafka from "../config/kafka";
// import establishWebSocketConnection from "../controllers/websocket";
import WebSocket from "ws";

const consumer = kafka.consumer({ groupId: "orchestrator-group" });

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.map((type) => {
    process.on(type, async (e) => {
        try {
            console.log(`process.on ${type}`);
            console.error(e);
            await consumer.disconnect();
            process.exit(0);
        } catch (_) {
            process.exit(1);
        }
    });
});

signalTraps.map((type) => {
    process.once(type, async () => {
        try {
            await consumer.disconnect();
        } finally {
            process.kill(process.pid, type);
        }
    });
});

const run = async () => {
    const wss = new WebSocket.Server({ port: 8090 });

    const connections: WebSocket[] = [];

    wss.on("connection", (ws) => {
        console.log("WebSocket connection established");

        connections.push(ws);

        ws.on("message", (message) => {
            console.log("Received message:", message);
        });
    });

    wss.on("listening", () => {
        console.log("WebSocket server is listening on port 8090");
    });

    wss.on("error", (error) => {
        console.error("WebSocket server error:", error);
    });

    wss.on("close", () => {
        console.log("WebSocket server closed");
    });

    function broadcastMessage(message: string) {
        connections.forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(message);
                console.log("sent");
            }
        });
    }

    await consumer.connect();
    await consumer.subscribe({ topic: "userdata" });
    await consumer.subscribe({ topic: "quotas_added" });
    await consumer.subscribe({ topic: "linechart_show" });
    await consumer.subscribe({ topic: "basicColumn_show" });
    await consumer.subscribe({ topic: "dependencyWheel_show" });
    await consumer.subscribe({ topic: "lineWithAnnotations_show" });
    await consumer.subscribe({ topic: "networkGraph_show" });
    await consumer.subscribe({ topic: "polarchart_show" });
    await consumer.subscribe({ topic: "diagram_id" });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value != null) {
                if (topic === "userdata") {
                    console.log(message.value.toString());
                    broadcastMessage(message.value.toString());
                } else if (topic === "linechart_show") {
                    // const { diagram } = JSON.parse(message.value.toString());
                    broadcastMessage(message.value.toString());
                    console.log("done");
                } else if (topic === "basicColumn_show") {
                    broadcastMessage(message.value.toString());
                    console.log("done");
                } else if (topic === "dependencyWheel_show") {
                    broadcastMessage(message.value.toString());
                    console.log("done");
                } else if (topic === "lineWithAnnotations_show") {
                    broadcastMessage(message.value.toString());
                    console.log("done");
                } else if (topic === "networkGraph_show") {
                    broadcastMessage(message.value.toString());
                    console.log("done");
                } else if (topic === "polarchart_show") {
                    broadcastMessage(message.value.toString());
                    console.log("done");
                } else if (topic === "quotas_added") {
                    broadcastMessage(message.value.toString());
                    console.log("123", message.value.toString());
                } else if (topic === "diagram_id") {
                    broadcastMessage(message.value.toString());
                }
            }
        },
    });
};

export default run;
