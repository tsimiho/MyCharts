import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connect";
import run from "./consumer/consumer";

const app = express();

dotenv.config();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 9007;

const start = async () => {
    const mongoURI = process.env.MONGO_URI;
    try {
        if (!mongoURI) {
            throw new Error("MONGO_URI environment variable is not defined.");
        } else {
            await connectDB(mongoURI);
            app.listen(port, () =>
                console.log(`Server is listening on port ${port}...`)
            );
        }
    } catch (error) {
        console.log(error);
    }
};

start();
run();

export default app;
