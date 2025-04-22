import { Router } from "express";
import { login } from "../../controllers/admin/LoginAdmin.js";
const router = Router()

router.post("/api/v2/admin/login",login)

export default router

