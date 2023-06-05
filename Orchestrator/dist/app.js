"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./database/connect"));
const create_1 = __importDefault(require("./routes/create"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// routes
app.use("/api/create", create_1.default);
const port = 9000;
const start = async () => {
    const mongoURI = process.env.MONGO_URI;
    try {
        if (!mongoURI) {
            throw new Error("MONGO_URI environment variable is not defined.");
        }
        else {
            await (0, connect_1.default)(mongoURI);
            app.listen(port, () => console.log(`Server is listening on port ${port}...`));
        }
    }
    catch (error) {
        console.log(error);
    }
};
start();
module.exports = app;
