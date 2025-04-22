import { Router } from "express";
import edit from "../../controllers/tutorial/EditTutorial.js";
const router = Router()

router.put("/api/v2/update/tutorial/:Tutor_Id",edit)

export default router