import { Router } from "express";
import { get } from "../../controllers/user/GetAllTips.js";
const router = Router();

router.get("/api/v1/get/all/tips", get);

export default router;
