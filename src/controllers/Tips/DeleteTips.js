import supabase from "../../supabase/supabase.js";

export const deleteTips = async (req, res) => {
  try {
    const { Tips_Id } = req.params;

    const { data: findTips, error: findError } = await supabase
      .from("Tips_N_Trick")
      .select("*")
      .eq("Tips_Id", Tips_Id)
      .single();

    if (findTips.length === 0) {
      res.status(404).json({
        type: "Failed",
        message: "Tips not found",
      });
    }

    const { data, error } = await supabase
      .from("Tips_N_Trick")
      .delete()
      .eq("Tips_Id", Tips_Id)
      .select();

    res.status(200).json({
      type: "Success",
      message: `Success deleted tips for Id : ${Tips_Id}`,
    });

    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
