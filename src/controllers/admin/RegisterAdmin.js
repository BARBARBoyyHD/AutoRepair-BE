import supabase from "../../supabase/supabase.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const { admin_name, password } = req.body;
    if (!admin_name || !password) {
      res.status(400).json({ message: "please fill all the fields" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("Admin")
      .insert([
        {
          admin_name,
          password: hashedPassword,
        },
      ])
      .select("*")
      .single();

    if (error) throw error;
    res.status(201).json({
      type: "succes",
      data: data,
    });

    return;
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
};
