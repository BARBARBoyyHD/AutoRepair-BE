import { Router } from "express";
import { deleteTips } from "../../controllers/Tips/DeleteTips.js";
const router = Router();

router.delete("/api/v2/delete/tips/:Tips_Id", deleteTips);

export default router;
