import Express from "express";
const router = Express.Router();

import login from "../controllers/login";

router.route("/").post(login);

export default router;
