"use server";
import { z } from "zod"
import Login from '../login/action';

const passwordSchema = z.string().min(8, { message: "Mật khẩu phải ít nhất 8 kí tự." }).max(20, { message: "Mật khẩu không được quá 20 kí tự" })
    .refine((password) => /[A-Z]/.test(password), {
        message: "Mật khẩu phải có ít nhất 1 chữ in hoa",
    })
    .refine((password) => /[a-z]/.test(password), {
        message: "Mật khẩu phải có ít nhất 1 chữ thường",
    })

const signUpSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "2 mật khẩu khác nhau"
})

export default async function SignUp(values: z.infer<typeof signUpSchema>) {
    let username = values.email, password = values.password
    let rawData = await fetch(process.env.BACKEND_URL! + "auth/sign-up", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "email": username,
            "password": password,
            "phone": "0355000001",
            "birthdate": "2000-10-10 00:00:00.000"
        })
    })
    if (rawData.ok !== true)
        throw "Server is Busy."
    let data = await rawData.json()
    if (!data.username || !data.email)
        throw "Data decoding goes wrong."
    return Login(values);
}