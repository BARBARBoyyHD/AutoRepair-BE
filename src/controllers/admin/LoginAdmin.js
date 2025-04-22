import supabase from "../../supabase/supabase.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { admin_name, password } = req.body;
    if (!admin_name || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    // Check if admin already exists
    const { data: existingAdmin, error: fetchError } = await supabase
      .from("Admin")
      .select("*")
      .eq("admin_name", admin_name)
      .single();

    if (fetchError) {
      res.status(500).json({ message: fetchError.message });
      return;
    }

    if (existingAdmin) {
      // If admin exists, compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, existingAdmin.password);

      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      res.status(200).json({
        type: "success",
        message:"Login Succes"
      });
      return;
    }

    // If the admin doesn't exist, hash the password and insert the new admin
    const hashedPassword = await bcrypt.hash(password, 10);  // Hashing the password with 10 salt rounds

    const { data, error: insertError } = await supabase
      .from("Admin")
      .insert([
        {
          admin_name,
          password: hashedPassword,
        },
      ])
      .select("*")
      .single();

    if (insertError) {
      res.status(500).json({ message: insertError.message });
      return;
    }

    res.status(201).json({
      type: "success",
      data: data,
    });

    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
