import dotenv from "dotenv";
import express from "express";
import upload from "./src/middleware/Storage.js";
dotenv.config();

import PostTips from "./src/controllers/Tips/PostTips.js";
import LoginAdminRoutes from "./src/routes/admin/LoginAdminRoutes.js";
import RegisterAdminRoutes from "./src/routes/admin/RegisterAdminRoutes.js";
import PostTutorial from "./src/routes/tutorial/PostTutorial.js";
import GetTutorial from "./src/routes/tutorial/GetTutorial.js";
import SingleTutorial from "./src/routes/tutorial/SingleTutorial.js";
import deleteTutorial from "./src/routes/tutorial/DeleteTutorial.js";
import EditTutorial from "./src/routes/tutorial/EditTutorial.js";
import GetSingleTips from "./src/routes/Tips/GetSingleTips.js";
import GetAllTips from "./src/routes/Tips/GetAllTips.js";

const app = express();
const port = process.env.PORT;

const tipsUpload = upload.fields([
  { name: "Thumbnail", maxCount: 1 },
  { name: "Image", maxCount: 1 },
]);

const tutorialUpload = upload.fields([{ name: "Thumbnail", maxCount: 1 }]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working");
});

// Admin
app.post("/api/v2/admin/register", RegisterAdminRoutes);
app.post("/api/v2/admin/login", LoginAdminRoutes);
app.post("/api/v2/post/tips", tipsUpload, PostTips);
app.post("/api/v2/post/tutorial", tutorialUpload, PostTutorial);

app.get("/api/v2/list/tips", GetAllTips);
app.get("/api/v2/single/tips/:Tips_Id", GetSingleTips);

app.get("/api/v2/list/tutorial", GetTutorial);
app.get("/api/v2/single/tutorial/:Tutor_Id", SingleTutorial);

app.delete("/api/v2/delete/tutorial/:Tutor_Id", deleteTutorial);
app.put("/api/v2/update/tutorial/:Tutor_Id", tutorialUpload, EditTutorial);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
