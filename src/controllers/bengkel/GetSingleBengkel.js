import supabase from "../../supabase/supabase.js";

export const get = async (req, res) => {
  try {
    const { Bengkel_Id } = req.params;
    const { data, error } = await supabase
      .from("Bengkel")
      .select("*")
      .eq("Bengkel_Id", Bengkel_Id)
      .single();

    if (!data) {
      res.status(404).json({
        type: "Failed",
        message: "Bengkel Not Found",
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
