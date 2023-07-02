import Express from "express";
const router = Express.Router();

import download_csv from "../controllers/download_csv";

router.route("/").get(download_csv);

export default router;
