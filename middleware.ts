import { NextRequest, NextResponse } from "next/server";
import { parseJwt } from "./lib/utils";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")) {
        if (request.cookies.has("access") || request.cookies.has("refresh"))
            return NextResponse.redirect(new URL('/overview', request.url))
        return NextResponse.next()
    }
    if (!request.cookies.has("access") && !request.cookies.has("refresh"))
        return NextResponse.redirect(new URL('/login', request.url))
    let resp = NextResponse.next()
    if (!request.cookies.has("access")) {
        let rawRes = await fetch(process.env.BACKEND_URL! + "auth/refresh-token", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${request.cookies.get("refresh")}`
            }
        })
        if (!rawRes.ok)
            return NextResponse.redirect(new URL('/login', request.url))
        let data = await rawRes.json()
        let dataFromToken = parseJwt(data.accessToken)
        resp.cookies.set("access", data.accessToken, {
            secure: true,
            httpOnly: true,
            expires: dataFromToken.exp
        })
        dataFromToken = parseJwt(data.refreshToken)
        resp.cookies.set("refresh", data.refreshToken, {
            secure: true,
            httpOnly: true,
            expires: dataFromToken.exp
        })
    }
    return resp
}