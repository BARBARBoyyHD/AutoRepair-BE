import { Router } from "express";
import { get } from "../../controllers/bengkel/GetAllBengkel.js";
const router = Router()

router.get("/api/v2/all/bengkel",get)

export default router