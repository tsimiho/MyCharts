import kafka from "../config/kafka";
import adduser from "../services/adduser";
import addquotas from "../services/addquotas";

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
    await consumer.subscribe({ topic: 'login' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value != null) {
                if(topic === 'login') {
                    console.log("user consumer: "+message.value.toString())
                    await adduser(message.value.toString());
                } else if(topic === 'addquotas') {
                    const data = JSON.parse(message.value.toString())
                    console.log(data)
                    await addquotas(data[0],data[1]);
                }     
            }
        },
    });
};

export default run;
