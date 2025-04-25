
import jwt from 'jsonwebtoken'
import { db } from '../libs/db.js';

export const authMiddleware = async(req,res,next)=>{

    try {
        
        const token = req.cookies.jwt;

        if(!token){
            console.log("unauthorized");
        return res.status(401)
        .json({error:"unauthorized-no token provided"}) 
        }


        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
        console.log("unauthorized");
        return res.status(403).json({error:"unauthorized"})
        }

        const user = await db.user.findUnique({
            where:{id:decoded.id},
            select:{

             id:true,
            email:true,
            image:true,
            name:true,
            role:true

            }

        });

       if(!user)return res.status(404).json({error:"user not found"})

req.user = user;
next();

    } catch (error) {
        console.error("error authenticating user",error);
        res.status(500).json({message:"Error authenticating user"});
    }




}