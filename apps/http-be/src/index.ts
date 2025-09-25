import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/be-common/config";
import { authMiddleware } from "./authMiddleware";
import { SignupSchema, SigninSchema } from "@repo/common/types"

const app = express();

app.post("/signup", async (req,res)=>{
        const user = req.body;

        const parsedBody = await SignupSchema.safeParseAsync(user)

        if(!parsedBody.success){
            return res.json({
                message: "Incorrect format"
            });
        }

        const username = user.username;
        const password = user.password;

        try{
            const hashedPass = await bcrypt.hash(password,5);

            res.json({
                message: "You have signed up successfully"
            })
        }
        catch(e){

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
            const hashedPass = await bcrypt.hash(password,5);

            const userId = 1;
            const token = jwt.sign({
                userId
            },JWT_SECRET);

            res.json({
                token: token
            })
        }
        catch(e){
            
        }
    }
)

app.post("/create", authMiddleware, (req,res)=>{
    res.json({
        roomId: 123
    })
})

app.listen(3001);