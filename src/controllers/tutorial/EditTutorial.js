import supabase from "../../supabase/supabase.js";
import uploadImage from "../../utils/uploadImage.js"; // pastikan uploadImage ada!!

export default async function edit(req, res) {
  try {
    const { Tutor_Id } = req.params;
    const { Title, Description, Link_Tutor } = req.body;
    const files = req.files;

    // Step 1: Fetch existing tutorial
    const { data: existing, error: fetchError } = await supabase
      .from("Tutorial_Car")
      .select("*")
      .eq("Tutor_Id", Tutor_Id)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    // Step 2: Handle thumbnail upload
    let thumbnailUrl = existing.Thumbnail; // Default pakai yang lama

    if (files && files.Thumbnail && files.Thumbnail.length > 0) {
      const uploadResult = await uploadImage(files.Thumbnail[0], "thumbnails");

      if (uploadResult?.publicUrl) {
        thumbnailUrl = uploadResult.publicUrl; // Pastikan dapet URL
      } else {
        return res
          .status(400)
          .json({ message: "Failed to upload new thumbnail." });
      }
    }

    // Step 3: Prepare data untuk update
    const updatedData = {
      Title: Title || existing.Title,
      Description: Description || existing.Description,
      Link_Tutor: Link_Tutor || existing.Link_Tutor,
      Thumbnail: thumbnailUrl,
    };

    // Step 4: Update di Supabase
    const { data, error } = await supabase
      .from("Tutorial_Car")
      .update(updatedData)
      .eq("Tutor_Id", Tutor_Id)
      .select("*")
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ type: "success", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
}
