import LineChartSchema from "../models/linechart";
import kafka from "../config/kafka";

const addlinechart = async (email: string, data: object) => {
    console.log(data);
    const diagram = await LineChartSchema.create(data);

    const producer = kafka.producer();

    try {
        await producer.connect();

        const id = diagram._id;
        const title = diagram.title ? diagram.title["text"] : "";
        const type = "linechart";

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

export default addlinechart;
