import { FiBell, FiUser } from 'react-icons/fi';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Header() {
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
                        <a
                            href="#"
                            className="inline-flex items-center border-b-2 border-gray-900 px-1 pt-1 text-sm font-semibold text-gray-900"
                            aria-current="page"
                        >
                            Tổng quan
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
                        >
                            Giao dịch
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
                        >
                            Kế hoạch
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
                        >
                            Cài đặt khác
                        </a>
                    </nav>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex flex-shrink-0 items-center space-x-3'><Button
                            type="button"
                            className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-200 p-1" // Added padding p-1
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <FiUser className="h-6 w-6 text-gray-500" aria-hidden="true" />
                        </Button><span className="hidden sm:inline text-sm font-bold text-gray-800">Hồ sơ</span></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Setting</DropdownMenuItem>
                            <DropdownMenuItem>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
             <button type="button" className="text-gray-500">...</button>
           </div> */}

                </div>
            </div>

            {/* <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Tổng quan</a>
          <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-900">Giao dịch</a>
          </div>
      </div> */}
        </header>
    );
};
