// src/services/imageService.js
import supabase from "../supabase/supabase.js";

export async function uploadImage(file, folder = "images") {
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("tutorial")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("tutorial")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
