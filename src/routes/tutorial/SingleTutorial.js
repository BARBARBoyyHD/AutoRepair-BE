import { Router } from "express";
import { single } from "../../controllers/tutorial/SingleTutorial.js";
const router = Router();

router.get("/api/v2/single/tutorial/:Tutor_Id", single);

export default router;
