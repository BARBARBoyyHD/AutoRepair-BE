import dotenv from "dotenv";
import express from "express";
import upload from "./src/middleware/Storage.js";
import cors from "cors";
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
import DeleteTips from "./src/routes/Tips/DeleteTips.js";
import EditTips from "./src/routes/Tips/EditTips.js";
import GetAllTipsUser from "./src/routes/user/GetAllTips.js";
import GetAllTutorialUser from "./src/routes/user/GetAllTutorial.js";
import EditBengkel from "./src/routes/bengkel/EditBengkel.js";
import PostBengkel from "./src/routes/bengkel/PostBengkel.js";
import GetAllBengkel from "./src/routes/bengkel/GetAllBengkel.js";
import GetSingleBengkel from "./src/routes/bengkel/GetSingleBengkel.js";
import DeleteBengkel from "./src/routes/bengkel/DeleteBengkel.js";
import FindBengkel from "./src/routes/bengkel/FindBengkel.js";

const app = express();
const port = process.env.PORT;

const tipsUpload = upload.fields([
  { name: "Thumbnail", maxCount: 1 },
  { name: "Image", maxCount: 1 },
]);

const tutorialUpload = upload.fields([{ name: "Thumbnail", maxCount: 1 }]);
const bengkelUpload = upload.fields([{ name: "Image", maxCount: 1 }]);
app.use(
  cors({
    origin: ["https://drivix.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
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
app.post("/api/v2/bengkel/post", bengkelUpload, PostBengkel);

app.get("/api/v2/list/tips", GetAllTips);
app.get("/api/v2/single/tips/:Tips_Id", GetSingleTips);
app.get("/api/v2/list/tutorial", GetTutorial);
app.get("/api/v2/single/tutorial/:Tutor_Id", SingleTutorial);
app.get("/api/v2/all/bengkel", GetAllBengkel);

app.delete("/api/v2/delete/tutorial/:Tutor_Id", deleteTutorial);
app.delete("/api/v2/delete/tips/:Tips_Id", DeleteTips);
app.delete("/api/delete/bengkel/:Bengkel_Id", DeleteBengkel);

app.put("/api/v2/update/tutorial/:Tutor_Id", tutorialUpload, EditTutorial);
app.put("/api/v2/update/tips/:Tips_Id", tipsUpload, EditTips);
app.put("/api/v2/bengkel/edit/:Bengkel_Id", bengkelUpload, EditBengkel);

// user
app.get("/api/v1/get/all/tips", GetAllTipsUser);
app.get("/api/v1/get/all/tutorial", GetAllTutorialUser);
app.get("/api/v2/single/bengkel/:Bengkel_Id", GetSingleBengkel);
app.get("/api/v1/bengkel", FindBengkel);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
