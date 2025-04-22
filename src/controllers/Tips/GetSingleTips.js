import supabase from "../../supabase/supabase.js";

export const single = async (req, res) => {
  try {
    const { Tips_Id } = req.params;
    const { data, error } = await supabase
      .from("Tips_N_Trick")
      .select("*")
      .eq("Tips_Id", Tips_Id)
      .single();

    if (data.length === 0) {
      res.status(404).json({
        type: "Failed",
        message: "No Tips Found",
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
