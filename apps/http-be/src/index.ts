import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/be-common/config";
import { authMiddleware } from "./authMiddleware";
import { SignupSchema, SigninSchema, RoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"

const app = express();
app.use(express.json());

app.post("/signup", async (req,res)=>{
        const user = req.body;

        const parsedBody = await SignupSchema.safeParseAsync(user)

        if(!parsedBody.success){
            return res.json({
                message: "Incorrect format"
            });
        }

        try{
            const hashedPass = await bcrypt.hash(parsedBody.data.password,5);

            await prismaClient.user.create({
                data:{
                    name:parsedBody.data.name,
                    username:parsedBody.data.username,
                    password:hashedPass
                }
            })

            res.json({
                message: "You have signed up successfully"
            })
        }
        catch(e){
            res.status(411).json({
                error: e
            })
        }
    }
)

app.post("/signin", async (req,res)=>{
        const user = req.body;

        const parsedBody = await SigninSchema.safeParseAsync(user)

        if(!parsedBody.success){
            return res.json({
                message: "Incorrect format"
            });
        }

        const username = user.username;
        const password = user.password;

        try{
            const dbUser = await prismaClient.user.findUnique({
                where: { username }
            });

            if(!dbUser){
                return res.status(401).json({
                    message: "User doesn't exists"
                })
            }

            const isMatch = await bcrypt.hash(password,dbUser.password);

            if(!isMatch){
                return res.status(401).json({
                    message: "Invalid username or password"
                })
            }

            const token = jwt.sign({
                userId: dbUser.id
            },JWT_SECRET);

            res.json({
                token: token
            })
        }
        catch(e){
            res.json({
                error: e
            })
        }
    }
)

app.post("/create", authMiddleware, async (req,res)=>{
    const parsedData = await RoomSchema.safeParseAsync(req.body);
    if(!parsedData.success){
        return res.json({
            message:"Incorrect inputs"
        })
    }

    const userId = req.userId!;

    try{
        const room = await prismaClient.room.create({
            data:{
                slug: parsedData.data.name,
                adminId: userId
            }
        })
        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.get("/chat/:roomId", async (req,res)=>{
    try{
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where:{
                roomId:roomId
            },
            orderBy:{
                id:"desc"
            },
            take: 50
        })

        res.json({
            messages
        })
    }
    catch(e){
        console.log(e)
       res.json({
            message: []
       }) 
    }
})

app.get("/room/:slug", async (req,res)=>{
    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        }
    })

    res.json({
       room
    })
})

app.listen(3001);