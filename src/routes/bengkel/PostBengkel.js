import { Router } from "express";
import post from "../../controllers/bengkel/PostBengkel.js";
const router = Router();

router.post("/api/v2/bengkel/post", post);

export default router;
