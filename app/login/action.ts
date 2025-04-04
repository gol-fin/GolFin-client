"use server";
import { cookies } from 'next/headers'
import {z} from "zod"
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export default async function Login(formData: FormData) {
    let username = formData.get("email"), password = formData.get("password");
    fetch(process.env.BACKEND_URL! + "auth/sign-in",{
    })

    return;
}