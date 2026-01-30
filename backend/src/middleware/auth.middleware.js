import { requireAuth } from "@clerk/express";
import  Clerk  from "@clerk/clerk-sdk-node";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";


export const protectRoute = [
    requireAuth() ,
    async (req , res , next) =>{
        try{
            const clerkId = req.auth().userId
            if(!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" })
            
            let user = await User.findOne({ clerkId }) 
            //if(!user) return res.status(401).json({ message: "Unauthorized - user not found" })
              //  req.user = user
             if (!user) {
    // Buscar por email si no existe por clerkId
    const clerkUser = await Clerk.users.getUser(clerkId);
    user = await User.findOne({ email: clerkUser.emailAddresses[0].emailAddress });
    if (!user) {
        user = await User.create({
            clerkId,
            email: clerkUser.emailAddresses[0].emailAddress,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        });
    } else if (!user.clerkId) {
        // Si existe por email pero no tiene clerkId, actualízalo
        user.clerkId = clerkId;
        await user.save();
    }
}
        req.user = user;
        next();
        } catch(error){
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ message: "Internal Server Error" });

        }
    }
]

export const adminOnly = (req, res, next) => {

    if(!req.user) {
        return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    if(req.user.email !== ENV.ADMIN_EMAIL) {
        return res.status(403).json({ message: "Forbidden - admin access only" });
    }

    next();
}