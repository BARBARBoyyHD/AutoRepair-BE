import supabase from "../../supabase/supabase.js";
import upload from "../../middleware/Storage.js"; // still using this
import { uploadImage } from "../../services/BengkelServices.js"; // still using this

export const uploadImages = upload.fields([{ name: "Image", maxCount: 1 }]);

export default async function edit(req, res) {
  try {
    const { Bengkel_Id } = req.params;
    const {
      Bengkel_name,
      Address,
      Phone_Number,
      Description,
      Coordinate_X,
      Coordinate_Y,
      existingImage,
      Link,
    } = req.body;
    const files = req.files;

    const Images = existingImage;

    if (files?.Image && files.Image.length > 0) {
      // kalau upload image baru
      Images = await uploadImage(files.Image[0], "images");
    }

    // Upload images to Supabase

    // Insert into DB
    const { data, error } = await supabase
      .from("Bengkel")
      .update([
        {
          Bengkel_name,
          Address,
          Phone_Number,
          Description,
          Coordinate_X,
          Coordinate_Y,
          image: Images,
          Link,
        },
      ])
      .eq("Bengkel_Id", Bengkel_Id)
      .select("*")
      .maybeSingle();

    if (error) throw error;

    return res.status(201).json({
      type: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
