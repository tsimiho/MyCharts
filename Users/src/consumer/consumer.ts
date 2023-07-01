import kafka from "../config/kafka";
import adduser from "../services/adduser";
import addquotas from "../services/addquotas";
import add_diagram from "../services/adddiagram";

const consumer = kafka.consumer({ groupId: "user-group" });

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
    await consumer.subscribe({ topic: "login" });
    await consumer.subscribe({ topic: "addquotas" });
    await consumer.subscribe({ topic: "diagram_id" });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value != null) {
                if (topic === "login") {
                    console.log("user consumer: " + message.value.toString());
                    await adduser(message.value.toString());
                } else if (topic === "addquotas") {
                    const { email, quotas } = JSON.parse(
                        message.value.toString()
                    );
                    await addquotas(email, quotas);
                } else if (topic === "diagram_id") {
                    const { email, id, name } = JSON.parse(
                        message.value.toString()
                    );
                    await add_diagram(email, id, name);
                }
            }
        },
    });
};

export default run;
