import supabase from "../../supabase/supabase.js";

export const deleteBengkel = async (req, res) => {
  try {
    const { Bengkel_Id } = req.params;

    const { data: findID, error: ErrorId } = await supabase
      .from("Bengkel")
      .select("*")
      .eq("Bengkel_Id", Bengkel_Id)
      .single();

    if (!findID) {
      res.status(404).json({
        type: "Failed",
        message: "Bengkel not found",
      });
      return;
    }

    const { data, error } = await supabase
      .from("Bengkel")
      .delete()
      .eq("Bengkel_Id", Bengkel_Id)
      .maybeSingle();

    res.status(200).json({
      message: `Success delete bengkel for Id: ${Bengkel_Id}`,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
