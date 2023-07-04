import Express from "express";
const router = Express.Router();

import linechart from "../controllers/linechart";
import basicColumn from "../controllers/basicColumn";
import dependencyWheel from "../controllers/dependencyWheel";
import lineWithAnnotations from "../controllers/lineWithAnnotations";
import networkGraph from "../controllers/networkGraph";
import polarchart from "../controllers/polarchart";

router.route("/linechart").post(linechart);
router.route("/basicColumn").post(basicColumn);
router.route("/dependencyWheel").post(dependencyWheel);
router.route("/lineWithAnnotations").post(lineWithAnnotations);
router.route("/networkGraph").post(networkGraph);
router.route("/polarchart").post(polarchart);

export default router;
