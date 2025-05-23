import {z} from "zod"
 

export const CreateUserSchema = z.object({ 
    username: z.string() ,
    password: z.string() ,
    name: z.string(),
    email: z.string() ,
  })


export const SigninSchema = z.object({
    username: z.string().min(5, "Username must contain atleast 2 charecters").max(20),
    password: z.string().min(8, "Password shouldn't be less than 8 charecters").max(20),
 })

 export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
    
     
 })