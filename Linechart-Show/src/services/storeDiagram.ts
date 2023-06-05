import LineChartSchema from "../models/linechart";
import kafka from "../config/kafka";

const storeDiagram = async (email: string, data: object, name: string) => {
    const diagram = await LineChartSchema.create(data);

    const producer = kafka.producer();

    try {
        await producer.connect();

        const id = diagram._id;

        const message = JSON.stringify({
            email,
            id,
            name,
        });
        await producer.send({
            topic: "diagram_id",
            messages: [{ key: "0", value: message }],
        });
    } catch (error) {
        console.log(`[kafka-producer] ${(error as Error).message}`, error);
    }
};

export default storeDiagram;
