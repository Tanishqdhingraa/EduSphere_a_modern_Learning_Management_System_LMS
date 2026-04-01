import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Admin } from "./model.js";


// ===================== SIGNUP =====================
export const signup = async (req, res) => {
  const adminSchema = z.object({
    firstName: z.string().min(3, { message: "First name must be at least 3 characters long" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });

  const validatedData = adminSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.issues.map((err) => err.message),
    });
  }

  const { firstName, lastName, email, password } = validatedData.data;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ errors: ["Admin already exists"] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin", // 👈 ensure role exists
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Signup successful",
      admin: {
        id: newAdmin._id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
      },
    });

  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ errors: ["Error in signup"] });
  }
};


// ===================== LOGIN =====================
export const login = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const validatedData = loginSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.issues.map((err) => err.message),
    });
  }

  const { email, password } = validatedData.data;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(403).json({ errors: ["Invalid credentials"] });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: ["Invalid credentials"] });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin", // 👈 IMPORTANT for other services
      },
      process.env.JWT_ADMIN_PASSWORD,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ errors: ["Error in login"] });
  }
};


// ===================== LOGOUT =====================
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
    });

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ errors: ["Error in logout"] });
  }
};
