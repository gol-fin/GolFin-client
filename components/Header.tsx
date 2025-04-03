import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { FiBell, FiUser } from 'react-icons/fi';

interface HeaderProps {
    activeTab?: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
    const navLinks = [
        { name: 'Tổng quan', href: '/overview' },
        { name: 'Giao dịch', href: '/transactions' },
        { name: 'Kế hoạch', href: '/planning' },
        { name: 'Cài đặt khác', href: '/settings' },
    ];

    return (
        <header className="bg-gray-200 mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-200"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <FiBell className="h-6 w-6" aria-hidden="true" />
                        </Button>
                    </div>

                    <nav className="hidden md:flex md:flex-1 md:justify-center md:space-x-8 lg:space-x-10" aria-label="Global">
                        {navLinks.map((link) => (
                            <Link // Use Next.js Link for client-side navigation
                                key={link.name}
                                href={link.href}
                                // Conditionally apply active/inactive styles
                                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${activeTab === link.name
                                    ? 'border-gray-900 font-semibold text-gray-900' // Active styles
                                    : 'border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-900' // Inactive styles
                                    }`}
                                aria-current={activeTab === link.name ? 'page' : undefined}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex flex-shrink-0 items-center space-x-3'><div
                            className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-200 p-1" // Added padding p-1
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <FiUser className="h-6 w-6 text-gray-500" aria-hidden="true" />
                        </div><span className="hidden sm:inline text-sm font-bold text-gray-800">Hồ sơ</span></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Setting</DropdownMenuItem>
                            <DropdownMenuItem>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;