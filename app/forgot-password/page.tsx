'use client'; // Add this if you're using Next.js App Router

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Import Link if you want to add a "Back to Login" link
import Link from 'next/link'; // Keep Link if needed for a back button
import type { NextApiRequest, NextApiResponse } from 'next'



export default function ForgotPasswordPage() {
    // State to manage the current step ('email', 'otp', 'reset', 'success')
    const [step, setStep] = useState('email');
    // State for form inputs
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // State for loading indicators and errors
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- Handlers for each step ---

    const handleEmailSubmit = async (e: any) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        if (!email) {
            setError('Vui lòng nhập địa chỉ email.');
            return;
        }
        setIsLoading(true);
        // --- TODO: API Call to request OTP ---
        // Example simulation:
        console.log('Requesting OTP for:', email);


        let callResult : any = false;
        
        await new Promise((resolve, reject) => {
            fetch('https://golfin-server.onrender.com/auth/password-recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to send OTP. Please try again.');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('OTP request successful:', data);
                    resolve(data);
                    setIsLoading(false);
                    setStep('otp'); 
                })
                .catch((error) => {
                    console.error('Error requesting OTP:', error);
                    setError('Không thể gửi OTP. Vui lòng thử lại.');
                    setIsLoading(false);
                    reject(error);
                });
        });
    };

    const handleOtpSubmit = async (e: any) => {

        e.preventDefault();
        setError('');
        if (!otp || otp.length < 6) { // Example validation
            setError('Vui lòng nhập mã OTP gồm 6 chữ số.');
            return;
        }
        setIsLoading(true);
        // --- TODO: API Call to verify OTP ---
        // Example simulation:

        await new Promise((resolve, reject) => {
            fetch('https://golfin-server.onrender.com/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to request OTP. Please try again.');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('OTP is OK:', data);
                    resolve(data);
                    setIsLoading(false);
                    setStep('reset'); // Move to reset password step
                })
                .catch((error) => {
                    console.error('Error requesting OTP:', error);
                    setError('Mã OTP không hợp lệ hoặc đã hết hạn.');
                    setIsLoading(false);
                    reject(error);
                });
        });
    };

    const handlePasswordResetSubmit = async (e: any) => {
        e.preventDefault();
        setError('');

        // --- Validate new password and confirm password ---
        // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
        if (!newPassword || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ mật khẩu mới.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }
        
        if (newPassword.length < 8) { // Example validation
            setError('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }

        if (!/[A-Z]/.test(newPassword)) {
            setError('Mật khẩu phải có ít nhất một chữ cái viết hoa.');
            return;
        }
        if (!/[a-z]/.test(newPassword)) {
            setError('Mật khẩu phải có ít nhất một chữ cái viết thường.');
            return;
        }
        
        if (!/[0-9]/.test(newPassword)) {
            setError('Mật khẩu phải có ít nhất một chữ số.');
            return;
        }

        if (!/[!@#$%^&*]/.test(newPassword)) {
            setError('Mật khẩu phải có ít nhất một ký tự đặc biệt.');
            return;
        }

        if (!newPassword || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ mật khẩu mới.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }
        if (newPassword.length < 8) { // Example validation
            setError('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }

        setIsLoading(true);

        await new Promise((resolve, reject) => {
            fetch('https://golfin-server.onrender.com/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to reset password. Please try again.');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Password reset successful:', data);
                    resolve(data);
                    setIsLoading(false);
                    setStep('success'); // Move to success state

                })
                .catch((error) => {
                    console.error('Error resetting password:', error);
                    setError('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
                    setIsLoading(false);
                    reject(error);
                });
        });

        // setIsLoading(false);
        // setStep('success'); // Move to success state
        // --- Handle API errors ---
        // if (apiError) {
        //   setError('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
        //   setIsLoading(false);
        // }
    };


    // --- Render different form sections based on the step ---

    const renderFormContent = () => {
        switch (step) {
            case 'otp':
                return (
                    <>
                        <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Nhập mã OTP
                        </h2>
                        <p className="mb-6 text-center text-sm text-gray-600">
                            Mã xác thực gồm 6 chữ số đã được gửi đến{' '}
                            <span className="font-medium">{email}</span>.
                        </p>
                        <form className="space-y-6" onSubmit={handleOtpSubmit}>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                    Mã OTP
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text" // Use text for flexibility, or number
                                        inputMode="numeric" // Hint for numeric keyboard
                                        autoComplete="one-time-code"
                                        required
                                        maxLength={6} // Example length
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Nhập 6 chữ số"
                                    />
                                </div>
                                {/* Optional: Add Resend OTP link/button here */}
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-md border border-blue-500 bg-gray-300 py-2 px-4 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'Đang xác thực...' : 'Xác nhận OTP'}
                                </Button>
                            </div>
                        </form>
                    </>
                );

            case 'reset':
                return (
                    <>
                        <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Đặt lại mật khẩu mới
                        </h2>
                        <p className="mb-6 text-center text-sm text-gray-600">
                            Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
                        </p>
                        <form className="space-y-6" onSubmit={handlePasswordResetSubmit}>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                    Mật khẩu mới
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Nhập mật khẩu mới"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Xác nhận mật khẩu mới
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Nhập lại mật khẩu mới"
                                    />
                                </div>
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-md border border-blue-500 bg-gray-300 py-2 px-4 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'Đang lưu...' : 'Lưu mật khẩu mới'}
                                </Button>
                            </div>
                        </form>
                    </>
                );
            case 'success':
                return (
                    <div className="text-center">
                        <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Thành công!
                        </h2>
                        <p className="mb-6 text-sm text-gray-600">
                            Mật khẩu của bạn đã được đặt lại thành công.
                        </p>
                        <Link href="/login" // Link back to your login page
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            Quay lại Đăng nhập
                        </Link>
                    </div>
                );

            case 'email': // Default case / Initial step
            default:
                return (
                    <>
                        <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Quên mật khẩu của bạn
                        </h2>
                        <p className="mb-6 text-center text-sm text-gray-600">
                            Vui lòng nhập email của bạn bên dưới và chúng tôi sẽ gửi mã OTP để xác nhận
                        </p>
                        <form className="space-y-6" onSubmit={handleEmailSubmit}>
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-md border border-blue-500 bg-gray-300 py-2 px-4 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'Đang gửi...' : 'Gửi mã OTP'}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <Link href="/login" // Link back to your login page
                                    className="font-medium text-gray-500 hover:text-gray-700">
                                    Quay lại đăng nhập
                                </Link>
                            </div>
                        </form>
                    </>
                );
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Header */}
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

            {/* Main Content Area */}
            <main className="flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Form Card */}
                    <div className="rounded-lg bg-white p-8 shadow-md min-h-[300px]"> {/* Added min-height */}
                        {renderFormContent()}
                    </div>
                </div>
            </main>
        </div>
    );
}