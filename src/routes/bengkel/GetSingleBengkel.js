import { Router } from "express";
import { get } from "../../controllers/bengkel/GetSingleBengkel.js";
const router = Router();

router.get("/api/v2/single/bengkel/:Bengkel_Id", get);

export default router;
