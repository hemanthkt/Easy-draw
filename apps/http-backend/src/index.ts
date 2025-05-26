import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import {middleware} from "./middleware"
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {prismaClient }from  "@repo/db/client"
const app = express()
app.use(express.json())


app.post("/signup",async (req,res) => {
      const parsedData = CreateUserSchema.safeParse(req.body);
       
     if(!parsedData.success) {
                console.log(parsedData.error);

          res.json({
         message: "Incorrect inputs"
        })
        return
     }
try {
    const user =  await prismaClient.user.create({
        data: {
            username: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
            email: parsedData.data.email
            
          }
     })

    res.json({
       userId: user.id
    })
} catch (error) {
    console.error
    res.status(411).json({
        message: "User already exits"
    })
}
   
    
})

app.post("/signin", async(req,res) => {
   const parsedData= SigninSchema.safeParse(req.body);
     if(!parsedData.success) {
        console.log(parsedData.error);

          res.json({
         message: "Incorrect inputs"
        })
        return
     }
    const parsedId= await  prismaClient.user.findUnique({
        where:{
            username: parsedData.data.username, 
            password: parsedData.data.password
        }
    })

    if(!parsedId){
        res.status(403).json({
            message: "User unauthorized"
        })
    }

    console.log(parsedId);
    

const token  = jwt.sign({
    userId: parsedId?.id
},JWT_SECRET)
    
res.json({
    token
})
    
})

app.post("/room",middleware,async (req,res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
     if(!parsedData.success) {
          res.json({
         message: "Incorrect inputs"
        })
        return
     }
    //  @ts-ignore
     const userId = req.userId
    const room = await prismaClient.room.create({
        data: {

            slug: parsedData.data.name,
            adminId: userId
        }
     })

       
     
    res.json({
        roomId: room.id
    })
})

app.get("/chats/:roomId", async (req , res) => {
    const roomId = Number(req.params.roomId)
    const messages = await prismaClient.chat.findMany({
        where: {
             roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })
   res.json({
    messages
   })
})

app.get("/room/:slug",async (req,res) => {
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
app.listen(3001)