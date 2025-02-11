import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
    
    //crear token (jwt)
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});

    //setear cookie
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 3600 * 1000, // 15 dias expresados en milisegundos
        httpOnly: true, // previene XSS, cross-site scripting, haciendola inaccesible desde JS
        sameSite:"strict", // previene CRSF, cross-site request forgery
        secure: ENV_VARS.NODE_ENV !== "development"
    });

    return token;
};