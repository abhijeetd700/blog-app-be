import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const getPosts = async(req,res)=>{

    // const authHeader = req.headers['authorization']
    // // Check if token is provided in the Authorization header
    // const token = authHeader && authHeader.split(' ')[1];
    // if(!token) return res.status(401).json({message:"Access token is missing"})
    
    // jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
    //     if (err) {
    //         return res.status(403).json({ message: 'Invalid or expired token' });
    //     }
    //     console.log(userInfo)
    // })

    try{
        const cat = req.query.cat
        let posts = null;
        if(cat){
            posts = await prisma.post.findMany({
                        where:{
                                category : cat
                            }
                        })
        }
        else{
            posts = await prisma.post.findMany()
        }

        if(posts.length===0){
            return res.status(404).json({
                message:"No posts Found"
            })
        }

        res.status(200).json({
            posts
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:error.message,
            stack:error.stack,
            type:error.name
        })
    }
    
    
}
export const getPost = async(req,res)=>{

    // const authHeader = req.headers['authorization']
    // // Check if token is provided in the Authorization header
    // const token = authHeader && authHeader.split(' ')[1];
    // if(!token) return res.status(401).json({message:"Access token is missing"})
    
    // jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
    //     if (err) {
    //         return res.status(403).json({ message: 'Invalid or expired token' });
    //     }
    //     console.log(userInfo)
    // })

    try {

        const postId = parseInt(req.params.id)
       
        const post = await prisma.post.findUnique({
            where:{
                id:postId
            }
        })

        if(!post){
            return res.status(404).json({
                message:"Post Not Found"
            })
        }

        const user = await prisma.user.findUnique({
            where:{
                id:post.authorId
            }
        })

        res.status(200).json({
            post,user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message,
            stack:error.stack,
            type:error.name
        })
    }
   
}
export const createPost = async(req,res)=>{

    const authHeader = req.headers['authorization']
    // Check if token is provided in the Authorization header
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message:"Access token is missing"})
    
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        console.log(userInfo)
    })

    try{
        console.log({...req.body,author:{}})
        const post = await prisma.post.create({
            data:{
                ...req.body
            }
        })
        
        res.status(200).json({
            message:"Post created successfully",
            post:post
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:error.message,
            stack:error.stack,
            type:error.name
        })
    }
}
export const updatePost = async(req,res)=>{

    const authHeader = req.headers['authorization']
    // Check if token is provided in the Authorization header
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message:"Access token is missing"})
    
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        console.log(userInfo)
    })

    const postId = parseInt(req.params.id)
    try{
        const updatedPost = await prisma.post.update({
            where: {id:postId},
            data:{...req.body}
            
        })

        res.status(200).json({
            message:"Post updated successfully",
        })

    }
    catch(error){
        console.log(error)
        if(error.code === "P2025"){
            res.status(404).json({
                message:`Post not found with ID=${postId}`
            })
        }
        else{
            res.status(500).json({
                message:error.message,
                stack:error.stack,
                type:error.name
            })
        }
    }
}
export const deletePost = async(req,res)=>{

    try{

        const authHeader = req.headers['authorization']
        // Check if token is provided in the Authorization header
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) return res.status(401).json({message:"Access token is missing"})
        
        jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            console.log(userInfo)
        })

        const postId = parseInt(req.params.id)
    
        await prisma.post.delete({
            where: {id:postId}
        })

        res.status(200).json({
            message:"Post deleted successfully"
        })
        
    } catch (error) {

        console.log(error)
        if(error.code === "P2025"){
            res.status(404).json({
                message:`Post not found with ID=${postId}`
            })
        }
        else{
            res.status(500).json({
                message:error.message,
                stack:error.stack,
                type:error.name
            })
        }
        
    }
   
}

