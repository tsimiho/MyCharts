import Express from "express";
import cors from "cors";
import create from "./routes/create";
import login from "./routes/login";
import quotas from "./routes/quotas";
import download_csv from "./routes/download_csv";
import dotenv from "dotenv";
import run from "./consumer/consumer";

const app = Express();

dotenv.config();

app.use(Express.static("./public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/create", create);
app.use("/api/login", login);
app.use("/api/quotas", quotas);
app.use("/api/download_csv", download_csv);

const port = 9001;

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
run();

module.exports = app;
