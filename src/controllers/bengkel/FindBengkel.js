import supabase from "../../supabase/supabase.js";

export const get = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search) {
      const { data, error } = await supabase.from("Bengkel").select("*");

      if (error) throw error;

      res.status(200).json({
        type: "Success",
        data,
      });
      return;
    }

    const { data: FindBengkel, error: FindError } = await supabase
      .from("Bengkel")
      .select("*")
      .or(
        `Bengkel_name.ilike.%${search}%,Address.ilike.%${search}%,Description.ilike.%${search}%`
      );

    if (FindError) throw FindError;

    if (!FindBengkel || FindBengkel.length === 0) {
      res.status(404).json({
        type: "Failed",
        message: "Result Not Found",
      });
      return;
    }

    res.status(200).json({
      type: "Success",
      data: FindBengkel,
    });
    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
