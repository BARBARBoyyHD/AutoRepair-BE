import { Router } from "express";
import { deleteBengkel } from "../../controllers/bengkel/DeleteBengkel.js";
const router = Router();

router.delete("/api/delete/bengkel/:Bengkel_Id", deleteBengkel);

export default router;
