import supabase from "../../supabase/supabase.js";

export default async function edit(req, res) {
  try {
    const { Tutor_Id } = req.params;
    const { Title, Description, Link_Tutor } = req.body;
    const files = req.files;

    // Step 1: Fetch existing data
    const { data: existing, error: fetchError } = await supabase
      .from("Tutorial_Car")
      .select("*")
      .eq("Tutor_Id", Tutor_Id)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    // Step 2: If there's a new image, upload it
    let thumbnailUrl = existing.Thumbnail;
    if (files?.Thumbnail) {
      thumbnailUrl = await uploadImage(files.Thumbnail[0], "thumbnails");
    }

    // Step 3: Prepare the updated fields (fallback to existing if not provided)
    const updatedData = {
      Title: Title ?? existing.Title,
      Description: Description ?? existing.Description,
      Link_Tutor: Link_Tutor ?? existing.Link_Tutor,
      Thumbnail: thumbnailUrl,
    };

    // Step 4: Update the database
    const { data, error } = await supabase
      .from("Tutorial_Car")
      .update(updatedData)
      .eq("Tutor_Id", Tutor_Id)
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      type: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
