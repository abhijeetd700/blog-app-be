import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req,res)=>{
    
    try{
        const user = await prisma.user.findUnique({
            where:{username:req.body.username}
        })

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = bcrypt.compareSync(req.body.password, user.password);

        if(!isValid){
            return res.status(401).json({message:'Password Incorrect'})
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})

        const {password,...userData} = user

        // res.cookie('access_token',token,{
        //     httpOnly: true
        // })
        res.status(200).json({
            token,userData
        })


    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:'An error occurred while processing your request'
        })
    }
}
export const logout = (req,res)=>{
    // res.
    // res.clearCookie("access_token",{
    //     sameSite:"none",
    //     secure:true
    //   }).status(200).json("User has been logged out.")
}
export const register = async (req,res)=>{

    const { username, email } = req.body;
    // console.log(req.body)
    try {
        await prisma.user.findUnique({
            where:{
                email:email,
                username:username
            }
        });
        
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        
        await prisma.user.create({
            data: { username, email, password }
        });

        res.status(200).json({message:"User has been created."});
    } 
    catch (error) {

        console.log(error)
        if (error.code === 'P2002') {
            res.status(400).json({
              error: 'Unique constraint violation',
            //   message: `The value for ${error.meta.target} already exists. Please use a different value.`,
              message: `User already exists for given username/email`,
            });
        }else{
            res.status(500).json({message:error.message,name:error.name,stack:error.stack});
        }

    }
    // res.json("From Controller..!")
}
