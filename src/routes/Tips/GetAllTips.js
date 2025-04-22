import { Router } from "express";
import { get } from "../../controllers/Tips/GetAllTips.js";
const router = Router();

router.get("/api/v2/list/tips", get);

export default router;
