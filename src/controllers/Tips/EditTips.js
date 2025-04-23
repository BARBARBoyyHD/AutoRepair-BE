import supabase from "../../supabase/supabase.js";
import upload from "../../middleware/Storage.js"; // still using this
import { uploadImage } from "../../services/TipsNtrickServices.js"; // still using this

export const uploadImages = upload.fields([
  { name: "Thumbnail", maxCount: 1 },
  { name: "Image", maxCount: 1 },
]);

export default async function edit(req, res) {
  try {
    const { Tips_Id } = req.params;
    const { Title, Description } = req.body;
    const files = req.files;

    if (!files?.Thumbnail || !files?.Image) {
      res.status(400).json({ message: "Thumbnail and Image are required" });
      return;
    }

    // Upload images to Supabase
    const thumbnailUrl = await uploadImage(files.Thumbnail[0], "thumbnails");
    const imageUrl = await uploadImage(files.Image[0], "images");

    // Insert into DB
    const { data, error } = await supabase
      .from("Tips_N_Trick")
      .update([
        {
          Title,
          Description,
          Thumbnail: thumbnailUrl,
          Image: imageUrl,
        },
      ])
      .eq("Tips_Id",Tips_Id)
      .select("*")
      .maybeSingle();

    if (error) throw error;

    return res.status(201).json({
      type: "success",
      message:`update tips success for Id : ${Tips_Id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
