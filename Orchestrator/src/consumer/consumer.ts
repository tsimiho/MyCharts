import kafka from "../config/kafka";

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
    await consumer.subscribe({ topic: 'userdata' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value != null) {
                if(topic === 'userdata') {
                    console.log(message.value.toString())
                } else if (topic === "linechart_show") {
                    const { diagram } = JSON.parse(message.value.toString())
                    // send diagram to frontend
                }

            }
        },
    });
};

export default run;
