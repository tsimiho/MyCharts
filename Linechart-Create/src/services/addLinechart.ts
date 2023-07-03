import LineChartSchema from "../models/linechart";
import kafka from "../config/kafka";

const addlinechart = async (email: string, data: object) => {
    console.log("before");
    const diagram = await LineChartSchema.create(data);
    console.log("after");

    const producer = kafka.producer();

    try {
        await producer.connect();

        const id = diagram._id;
        const title = diagram.title;
        const type = "linechart";

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

export default addlinechart;
