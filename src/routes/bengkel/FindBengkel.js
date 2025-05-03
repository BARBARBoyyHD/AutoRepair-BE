import { Router } from "express";
import { get } from "../../controllers/bengkel/FindBengkel.js";
const router = Router();

router.get("/api/v1/bengkel", get);

export default router;
