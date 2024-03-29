import Express from "express";
const router = Express.Router();

import quotas from "../controllers/quotas";

router.route("/").post(quotas);

export default router;
