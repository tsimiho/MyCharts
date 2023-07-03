import kafka from "../config/kafka";
import addnetworkGraph from "../services/addNetworkGraph";

const consumer = kafka.consumer({ groupId: "networkGraph-create-group" });

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
    await consumer.subscribe({ topic: "networkGraph_create" });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value != null) {
                const { email, data } = JSON.parse(message.value.toString());
                await addnetworkGraph(email, data);
            }
        },
    });
};

export default run;
