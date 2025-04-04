import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Login from './action';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

export default function LoginPage() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <header className="bg-gray-200 py-3 shadow-sm mt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-10 items-center justify-center">
                        <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-gray-600">
                            Logo
                        </div>
                        <span className="text-xl font-semibold text-gray-800">
                            GolFin
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="rounded-lg bg-white p-8 shadow-md">
                        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Đăng nhập vào GolFin
                        </h2>

                        <p className="mb-8 text-center text-sm text-gray-600">
                            Bạn chưa có tài khoản ?{' '}
                            <Link href="/signup"
                                className="font-medium text-gray-500 hover:text-gray-700">
                                Đăng ký ở đây!
                            </Link>
                        </p>

                        <form className="space-y-6" action={Login} method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Địa chỉ e-mail
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mật khẩu
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mt-1 text-right">
                                    <Link href="/forgot-password"
                                        className="text-xs font-medium text-gray-500 hover:text-gray-700">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                >
                                    Đăng nhập vào GolFin
                                </Button>
                            </div>
                            <Separator className='-mb-6' />

                            <div className="mt-6 space-y-3 pt-6">
                                <p className="text-center text-xs text-gray-500 mb-3">Hoặc đăng nhập bằng</p>
                                <Button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in with Facebook
                                </Button>

                                <Button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in with Google
                                </Button>

                                <Button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in with Apple
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}