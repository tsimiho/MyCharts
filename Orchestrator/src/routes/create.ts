import Express from "express";
const router = Express.Router();

import linechart from "../controllers/linechart";

router.route("/linechart").post(linechart);

export default router;
