import { Router } from "express";
import post  from "../../controllers/tutorial/PostTutorial.js";
const router = Router();

router.post("/api/v2/post/tutorial", post);

export default router;
