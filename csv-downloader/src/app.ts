import Express from "express";
import cors from "cors";
import download_csv from "./routes/download_csv";
import dotenv from "dotenv";

const app = Express();

dotenv.config();

app.use(Express.static("./public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/download_csv", download_csv);

const port = 9014;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();

module.exports = app;
