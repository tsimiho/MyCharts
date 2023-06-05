import Express from "express";
const router = Express.Router();

import login from "../controllers/login";

router.route("/").get(login);

export default router;
