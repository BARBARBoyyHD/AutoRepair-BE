import supabase from "../../supabase/supabase.js";

export const single = async (req, res) => {
  try {
    const { Tutor_Id } = req.params;
    const { data: singleTutorial, error } = await supabase
      .from("Tutorial_Car")
      .select("*")
      .eq("Tutor_Id", Tutor_Id)
      .single();

    if (!singleTutorial) {
      res.status(404).json({
        type: "Failed",
        message: "Tutorial not found",
      });
      return;
    }
    console.log("UUID : " , Tutor_Id)
    res.status(200).json({
      type: "Success",
      data: singleTutorial,
    });
    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
