import { Router } from "express";
import { post } from "../../controllers/Tips/PostTips";
const router = Router()

router.post("/api/v2/post/tips",post)

export default router