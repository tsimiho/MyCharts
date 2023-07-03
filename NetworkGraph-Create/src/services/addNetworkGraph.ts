import NetworkGraphSchema from "../models/networkGraph";
import kafka from "../config/kafka";

const addnetworkGraph = async (email: string, data: object) => {
    const diagram = await NetworkGraphSchema.create(data);

    const producer = kafka.producer();

    try {
        await producer.connect();

        const id = diagram._id;
        const title = diagram.title;
        const type = "networkGraph";

        const message = JSON.stringify({
            email,
            id,
            title,
            type,
        });

        await producer.send({
            topic: "diagram_id",
            messages: [{ key: "0", value: message }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default addnetworkGraph;
