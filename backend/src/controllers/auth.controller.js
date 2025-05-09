import bcrypt from 'bcryptjs'

import {db} from '../libs/db.js'


import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'
import { UserRole } from '../generated/prisma/index.js';


export const register = async(req,res)=>{

    const {name , email , password} = req.body

    try {
        const existingUser = await db.user.findUnique({
            where:{email}
        })

        if(existingUser){
            return res.status(400).json( {
                    error:"User already exists"
                }  )
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })


        const token = jwt.sign(
            {id:newUser.id},
        process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_SECRET_EXPIRY
            }
        )


        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
           maxAge:7*24*60*60*1000
        })
               
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name :newUser.name,
                role:newUser.role,
                image:newUser.image
            }

        })


    } catch (error) {
        console.error("error creating user",error);
        res.status(500).json({
            error:"error creating user"
        })
    }




}

export const login = async(req,res)=>{

    const {email,password} = req.body;

   try {
     const user = await db.user.findUnique({
         where:{email}
     })
 
     if(!user){
         return res.status(401).json({
             error:"User  not found"
         })
     }
 
     const isMatch = await bcrypt.compare(password,user.password);
 
     if(!isMatch){
         return res.status(401).json({
             error:"Invalid credentials"
         })
     }

     const token = jwt.sign(
     {id:user.id },
 process.env.JWT_SECRET,
{expiresIn:process.env.JWT_SECRET_EXPIRY}
     )
 
     res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development",
        maxAge:7*24*60*60*1000
     })

     return res.status(201).json({
        success:true,
        message:"Logged in successfully",
        user:{
            id:user.id,
            email:user.email,
            name:user.email,
            role:user.role,
            image:user.image
        }
     })

 
   } catch (error) {
    console.log("Error in login controller",error);
    
    return res.status(500).json({
        error:"Error in loging out user",
        
    })
   }

}



export const logout = async(req,res)=>{

    const user  = await req.user;

    if(!user){
    console.log("user not authenticated to logout",error);
    return res.status(403).json({
        error:"not authorized to logout"
    })
    }

    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })

         res.status(204).json({
            success:true,
            message:"Logged out successfully"
        })

    } catch (error) {
        console.log("error in logout controller",error);
        return res.status(500).json({
            error:"error loging out user"
        })
        
    }


}


export const check = async(req,res)=>{
try {
    res.status(200).json({
        success:true,
        message:"user authenticated successfully",
        user:req.user
    })
} catch (error) {
    console.log("error checking user",error);
    
}


}