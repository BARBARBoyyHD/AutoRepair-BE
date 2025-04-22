import { Router } from "express";
import { deleteTutorial } from "../../controllers/tutorial/DeleteTutorial.js";
const router = Router()

router.delete("/api/v2/delete/tutorial/:Tutor_Id",deleteTutorial)

export default router