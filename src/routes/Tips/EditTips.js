import { Router } from "express";
import edit from "../../controllers/Tips/EditTips.js";
const router = Router();

router.put("/api/v2/update/tips/:Tips_Id", edit);

export default router;
