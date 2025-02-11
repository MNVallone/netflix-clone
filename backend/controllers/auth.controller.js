import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"; 
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res){
    const {email, password, username} = req.body;
    try {
    if(!email || !password || !username){
            return res.status(400).json({success:false, message:"All fields are required"});
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({success:false, message:"Invalid email"});
    }

    if(password.length < 6){
        return res.status(400).json({success:false, message:"Password must be at least 6 characters"});
    }

    const existingUserByEmail = await User.findOne({email:email});

    if(existingUserByEmail){
        return res.status(400).json({success:false, message:"Email already exists"});

    }

    const existingUserByUsername = await User.findOne({username:username});

    if(existingUserByUsername){
        return res.status(400).json({success:false, message:"Username already exists"});

    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
        email,
        password: hashedPassword,
        username,
        image
    })

    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();

    //sacar password de la res
    res.status(201).json({success:true, user: {
        ...newUser._doc,
        password:""
    }});

} catch (error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({success:false, message:"Internal server error"})
}
};

export async function login(req, res){
    res.send("Login Route");
};

export async function logout(req, res){
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message:"Logged out succesfully"});
    } catch (error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
};