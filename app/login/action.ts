"use server";
import { cookies } from 'next/headers'
import { z } from "zod"
import { redirect } from 'next/navigation'
import { parseJwt } from '@/lib/utils';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }).max(20, { message: "Password must be lower than 20 characters" })
        .refine((password) => /[A-Z]/.test(password), {
            message: "Password must have atleast 1 Uppercase",
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "Password must have atleast 1 Lowercase",
        })
})
export default async function Login(values: z.infer<typeof loginSchema>) {
    let username = values.email, password = values.password
    let rawData = await fetch(process.env.BACKEND_URL! + "auth/sign-in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    if (rawData.ok !== true)
        throw "Server is Busy."
    let data = await rawData.json()
    if (!data.accessToken || !data.refreshToken)
        throw "Data decoding goes wrong."
    let cookieStore = await cookies()
    let dataFromToken = parseJwt(data.accessToken)
    cookieStore.set("access", data.accessToken, {
        secure: true,
        httpOnly: true,
        expires: dataFromToken.exp
    })
    dataFromToken = parseJwt(data.refreshToken)
    cookieStore.set("refresh", data.refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dataFromToken.exp
    })
    return redirect("/overview");
}