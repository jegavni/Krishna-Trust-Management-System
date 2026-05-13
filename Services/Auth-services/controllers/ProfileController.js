import profile from "../models/Profile.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


export const profileUpdate = async (req, res) => {
    try {
        console.log("Received profile update request with data:", req.body);
        console.log("user", req.user);
        console.log("Received file:", req.file ? req.file.originalname : "No file uploaded");
        let imageUrl = "";
        const { name, profession, email, phone, address } = req.body;
        const userId = req.user.id;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "profile_pics" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
            imageUrl = result.secure_url;
        }

        //  Create or update the profile

        let userProfile = await profile.findOne({ user: userId });
        if (!userProfile) {
            userProfile = new profile({ user: userId, name, profession, email, phone, address, imageUrl });
        } else {
            Object.assign(userProfile, { name, profession, email, phone, address, imageUrl });
        }
        await userProfile.save();

        res.status(200).json({ message: "Profile saved successfully", profile: userProfile });
    } catch (error) {
        console.error("FULL ERROR:");
        console.error(error);
        console.error(error.stack);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// get profile 

export const getProfile = async (req, res) => {
    try {
        const user = req.user.id;
        const userProfile = await profile.findOne({ user });
        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ profile: userProfile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: error.message });
    }
};
