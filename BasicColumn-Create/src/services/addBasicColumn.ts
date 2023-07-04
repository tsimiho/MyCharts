import BasicColumnSchema from "../models/basicColumn";
import kafka from "../config/kafka";

const addbasicColumn = async (email: string, data: object) => {
    const diagram = await BasicColumnSchema.create(data);

    const producer = kafka.producer();

    try {
        await producer.connect();

        const id = diagram._id;
        const title = diagram.title;
        const type = "basicColumn";

        const message = JSON.stringify({
            email,
            id,
            title,
            type,
        });

        await producer.send({
            topic: "diagram_id",
            messages: [{ value: message }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default addbasicColumn;
