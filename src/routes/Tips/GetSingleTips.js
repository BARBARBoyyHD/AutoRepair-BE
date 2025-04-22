import { Router } from "express";
import { single } from "../../controllers/Tips/GetSingleTips.js";
const router = Router();

router.get("/api/v2/single/tips/:Tips_Id", single);

export default router;
