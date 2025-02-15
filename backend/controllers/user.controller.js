
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // 🔴 Check if any required field is missing
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // 🟢 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        let cloudResponse = null; // Store Cloudinary response if a file is uploaded
        let fileOriginalName = "";

        const file = req.file; // Get uploaded file (if any)
        if (file) {
            console.log("✅ File uploaded:", file.originalname);

            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw", // This ensures Cloudinary knows it's a raw file
                folder: "resumes",
                public_id: file.originalname, // Optional: Keep original name
                access_control: [{ access_type: "anonymous" }],
                flags: "attachment" // Ensures proper serving of PDFs
            });

            fileOriginalName = file.originalname;
            console.log("Cloudinary URL:", cloudResponse.secure_url);
        } else {
            console.log("⚠️ No file uploaded, proceeding with text fields only.");
        }

        // 🟢 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🟢 Create new user in DB
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : "", // Store Cloudinary URL if available
            }
        });

        return res.status(201).json({
            message: "Account Created Successfully...",
            success: true
        });

    } catch (error) {
        console.error("❌ Error in register:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
export const login=async (req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is mising",
                success: false
            });
        }
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            })
        }
        if(role!==user.role){
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        }
        const tokenData={
            userId: user._id
        }
        const token= jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'}); 
        user={
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token",token,{maxAge: 1*24*60*60*1000,httpsOnly: true,sameSite: 'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout=async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxage:0}).json({
            message: "Logged out successfully....",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file; // Get the uploaded file (if any)
        
        let cloudResponse = null;
        let fileOriginalName = "";

        if (file) {
            console.log("✅ File uploaded:", file.originalname);

            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: 'raw',  // Ensures Cloudinary knows it's a raw file
                folder: 'resumes',
                public_id: file.originalname, // Optional, to keep the original name
                access_control: [{ access_type: 'anonymous' }],
                flags: 'attachment'  // Prevents downloading and ensures PDF is served correctly
            });

            fileOriginalName = file.originalname;
            console.log("Cloudinary URL:", cloudResponse.secure_url);
        } else {
            console.log("⚠️ No file uploaded, proceeding with text fields only.");
        }

        let skillsArray = skills ? JSON.parse(skills) : [];

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found...",
                success: false
            });
        }

        // Update fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray.length > 0) user.profile.skills = skillsArray;

        // 🟢 Only update resume if a new file was uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = fileOriginalName;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully....",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });

    } catch (error) {
        console.error("❌ Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};