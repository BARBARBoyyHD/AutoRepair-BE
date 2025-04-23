import { json } from "express";
import supabase from "../../supabase/supabase.js";

export const get = async (req, res) => {
  try {
    const { data: TutorialData, error } = await supabase
      .from("Tutorial_Car")
      .select("*");

    if (!TutorialData) {
      res.status(404), json({ message: "You havent created any tutorial" });
    }

    res.status(200).json({
      type: "Success",
      data: TutorialData,
    });
    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
