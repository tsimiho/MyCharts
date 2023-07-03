import Express from "express";
const router = Express.Router();

import request from "../controllers/request";

router.route("/:type/:id/:action").get(request);

export default router;
