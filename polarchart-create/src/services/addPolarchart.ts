import PolarChartSchema from "../models/polarchart";
import kafka from "../config/kafka";

const addpolarchart = async (email: string, data: object) => {
    const diagram = await PolarChartSchema.create(data);

    const producer = kafka.producer();

    try {
        await producer.connect();

        const id = diagram._id;
        const title = diagram.title ? diagram.title["text"] : "";
        const type = "polarchart";

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

export default addpolarchart;
