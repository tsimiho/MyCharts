import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connect";

const app = Express();

dotenv.config();

app.use(Express.static("./public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/create", create);


const port = 9103;

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

module.exports = app;
