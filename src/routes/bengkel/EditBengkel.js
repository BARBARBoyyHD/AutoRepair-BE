import { Router } from "express";
import edit from "../../controllers/bengkel/EditBengkel.js";
const router = Router();

router.put("/api/v2/bengkel/edit/:Bengkel_Id", edit);

export default router;
