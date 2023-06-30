import UserSchema from "../models/linechart";
import kafka from "../config/kafka";

const producer = kafka.producer();

// const addlinechart = async (chartData: Highcharts.Options) => {
//     console.log("Here1")
//     try {
//         await producer.connect();
//         console.log("addlinechart: "+JSON.stringify(user))
//         await producer.send({
//             topic: "userdata",
//             messages: [{ value: JSON.stringify(user) }],
//         });
//     } catch (error) {
//         console.log(`[kafka-producer] ${(error as Error).message}`, error);
//     }
// };

// export default addlinechart;
