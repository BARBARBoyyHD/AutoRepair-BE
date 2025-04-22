import supabase from "../../supabase/supabase.js";
import upload from "../../middleware/Storage.js"; // still using this
import { uploadImage } from "../../services/TutorialServices.js"; // still using this

export const uploadImages = upload.fields([{ name: "Thumbnail", maxCount: 1 }]);

export default async function post(req, res) {
  try {
    const { Title, Description, Link_Tutor } = req.body;
    const files = req.files;

    if (!files?.Thumbnail) {
      res.status(400).json({ message: "Thumbnail are required" });
      return;
    }

    // Upload images to Supabase
    const thumbnailUrl = await uploadImage(files.Thumbnail[0], "thumbnails");

    // Insert into DB
    const { data, error } = await supabase
      .from("Tutorial_Car")
      .insert([
        {
          Title,
          Description,
          Link_Tutor,
          Thumbnail: thumbnailUrl,
        },
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      type: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
