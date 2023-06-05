import mongoose from "mongoose";
import kafka from "../config/kafka";
import storeDiagram from "../services/storeDiagram";
import returnDiagram from "../services/returnDiagram"; 

const consumer = kafka.consumer({ groupId: "my-consumer-group" });

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
    await consumer.connect();
    await consumer.subscribe({ topic: "linechart_create" });
    await consumer.subscribe({ topic: "linechart_request" });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value != null) {
                if (topic === "linechart_create") {
                    const { username, data } = JSON.parse(message.value.toString());
                    await storeDiagram(username, data);
                } else if (topic === "linechart_request"){
                    const id = new mongoose.Schema.Types.ObjectId(message.value.toString())
                    await returnDiagram(id);
                }
            }
        },
    });
};

export default run;
