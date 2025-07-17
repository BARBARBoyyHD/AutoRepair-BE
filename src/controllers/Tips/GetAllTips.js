import supabase from "../../supabase/supabase.js";

export const get = async (req, res) => {
  try {
    const category = req.query.category;
    let query = supabase.from("Tips_N_Trick").select("*");
    if (category === "Berat" || category === "Ringan") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      res.status(500).json({
        type: "failed",
        message: error.message,
      });
      return;
    }

    if (!data || data.length === 0) {
      res.status(404).json({
        type: "Failed",
        message: "You haven't created any tips",
      });
    }

    res.status(200).json({
      type: "Success",
      data: data,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
