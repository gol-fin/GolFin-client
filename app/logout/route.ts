import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const cookieStore = await cookies()
    cookieStore.delete("refresh")
    fetch(process.env.BACKEND_URL! + "auth/sign-out", {
        headers: {
            "Authorization": `Bearer ${cookieStore.get("access")}`
        }
    })
    cookieStore.delete("access")
    return redirect("/login")
}