import { Router } from "express";
import { get } from "../../controllers/user/GetAllTutorial.js";
const router = Router();

router.get("/api/v1/get/all/tutorial", get);

export default router;
