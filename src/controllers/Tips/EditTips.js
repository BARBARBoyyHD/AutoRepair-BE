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
    const { Title, Description, existingThumbnail, existingImage,category } = req.body;
    const files = req.files;

    let thumbnailUrl = existingThumbnail; // Default dari client
    let imageUrl = existingImage; // Default dari client

    if (files?.Thumbnail && files.Thumbnail.length > 0) {
      // kalau upload thumbnail baru
      thumbnailUrl = await uploadImage(files.Thumbnail[0], "thumbnails");
    }

    if (files?.Image && files.Image.length > 0) {
      // kalau upload image baru
      imageUrl = await uploadImage(files.Image[0], "images");
    }

    // Update ke database
    const { data, error } = await supabase
      .from("Tips_N_Trick")
      .update([
        {
          Title,
          Description,
          Thumbnail: thumbnailUrl,
          Image: imageUrl,
          category
        },
      ])
      .eq("Tips_Id", Tips_Id)
      .select("*")
      .maybeSingle();

    if (error) throw error;

    return res.status(201).json({
      type: "success",
      message: `update tips success for Id : ${Tips_Id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
