import supabase from "../../supabase/supabase.js";

export const deleteTutorial = async (req, res) => {
  try {
    const { Tutor_Id } = req.params;
    const { data, error } = await supabase
      .from("Tutorial_Car")
      .delete()
      .eq("Tutor_Id", Tutor_Id)
      .select();

    console.log("from delete ID : ", Tutor_Id);
    
    if (data.length === 0 ) {
      res.status(404).json({
        type: "Failed",
        message: "Tutorial not found",
      });
      return;
    }

    res.status(200).json({
      type: "Success",
      message: `Delete success for Id : ${Tutor_Id}`,
    });
    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
