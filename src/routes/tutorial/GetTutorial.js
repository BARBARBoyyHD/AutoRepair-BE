import { Router } from "express";
import { get } from "../../controllers/tutorial/GetTutorial.js";
const router = Router();

router.get("/api/v2/list/tutorial", get);

export default router;
