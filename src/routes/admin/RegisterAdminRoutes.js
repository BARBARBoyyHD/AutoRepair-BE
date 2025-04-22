import { Router } from "express";
import { register } from "../../controllers/admin/RegisterAdmin.js";
const router = Router()

router.post("/api/v2/admin/register",register)

export default router

