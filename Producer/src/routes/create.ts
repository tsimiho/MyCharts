import Express from "express";
const router = Express.Router();

import linechart from "../controllers/linechart";

router.route("/linechart").get(linechart);

export default router;
