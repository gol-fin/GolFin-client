"use client";

import { FiPlusCircle } from "react-icons/fi";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function TransactionForm() {
    const [date, setDate] = React.useState<Date>()
    const [catalogTitle, setCatalogTitle] = React.useState<string>("Hãy chọn danh mục!")
    const [activeType, setActiveType] = React.useState<'expense' | 'income'>('expense');
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
    const [amount, setAmount] = React.useState<number>(0)
    const [note, setNote] = React.useState<string>("")
    const [isRepeated, setIsRepeated] = React.useState<boolean>(false)
    const expenseCategories = [
        { id: 'exp-1', name: 'Ăn uống' },
        { id: 'exp-2', name: 'Mua sắm' },
        { id: 'exp-3', name: 'Giải trí' },
        { id: 'exp-4', name: 'Di chuyển' },
        { id: 'exp-5', name: 'Hóa đơn' },
    ];

    const incomeCategories = [
        { id: 'inc-1', name: 'Lương' },
        { id: 'inc-2', name: 'Trợ cấp' },
        { id: 'inc-3', name: 'Học bổng' },
        { id: 'inc-4', name: 'Thưởng' },
        { id: 'inc-5', name: 'Khác' },
    ];

    const categoriesToShow = activeType === 'expense' ? expenseCategories : incomeCategories;

    const handleCategoryClick = (category: { id: string; name: string }) => {
        setSelectedCategoryId(category.id);
        setCatalogTitle(category.name);
    };

    console.log(date != undefined)
    console.log(selectedCategoryId != null)
    console.log(amount != 0)
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        className="inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                        <FiPlusCircle className="font-bold text-gray-600" aria-hidden="true" />
                        Thêm giao dịch
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        Thêm giao dịch
                    </DialogTitle>
                    <div className="flex flex-wrap items-end gap-x-4 gap-y-2 py-2">
                        <div className="flex-1 max-w-[240px] basis-1/2">
                            <label htmlFor="transaction-date" className="block text-sm font-medium text-gray-500 mb-1 max-w-[240px]">
                                Ngày
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    // className="block w-full rounded-md border-gray-300 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex-1 min-w-[120px]">
                            <label htmlFor="transaction-category" className="block text-sm font-medium text-gray-500 mb-1">
                                Danh mục
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full">{catalogTitle}</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="mb-4 flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setActiveType('expense')}
                                            className={`flex-1 rounded-lg border px-4 py-2 text-center text-sm font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${activeType === 'expense'
                                                // ? 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200 shadow-sm' // Active style
                                                ? 'border-gray-400 bg-gray-200 text-gray-800 shadow-sm' // Active style
                                                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50' // Inactive style
                                                }`}
                                        >
                                            Chi phí
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveType('income')}
                                            className={`flex-1 rounded-lg border px-4 py-2 text-center text-sm font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${activeType === 'income'
                                                // ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200 shadow-sm' // Active style
                                                ? 'border-gray-400 bg-gray-200 text-gray-800 shadow-sm' // Active style
                                                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50' // Inactive style
                                                }`}
                                        >
                                            Thu nhập
                                        </button>
                                    </div>
                                    <div className="flex-grow overflow-y-auto pr-2">
                                        <ul className="space-y-3">
                                            {categoriesToShow.map((category) => (
                                                <li key={category.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCategoryClick(category)}
                                                        className={`flex w-full items-center space-x-3 rounded-md p-1.5 text-left focus:outline-none focus:ring-1 focus:ring-indigo-400 ${selectedCategoryId === category.id ? 'bg-indigo-50' : 'hover:bg-gray-50' // Optional: highlight selected
                                                            }`}
                                                    >
                                                        <span className={`h-5 w-5 flex-shrink-0 rounded-full border ${selectedCategoryId === category.id ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 bg-gray-200' // Optional: fill selected
                                                            }`}></span>
                                                        <span className={`text-sm ${selectedCategoryId === category.id ? 'font-medium text-indigo-700' : 'text-gray-600' // Optional: style selected text
                                                            }`}>
                                                            {category.name}
                                                        </span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-auto border-t border-gray-200 pt-3 text-center">
                                        <button
                                            type="button"
                                            className="text-sm text-gray-500 hover:text-gray-700 hover:underline focus:outline-none rounded"
                                        >
                                            Chỉnh sửa Danh mục
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-1 min-w-[90px] basis-1/4">
                            <label htmlFor="transaction-amount" className="block text-sm font-medium text-gray-500 mb-1">
                                Số tiền
                            </label>
                            <input
                                type="number"
                                name="transaction-amount"
                                id="transaction-amount"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                                placeholder="0"
                                step="1"
                                value={amount}
                                onChange={(v) => { setAmount(parseInt(v.target.value)) }}
                            />
                        </div>

                        <div className="flex-1 min-w-[150px]">
                            <label htmlFor="transaction-notes" className="block text-sm font-medium text-gray-500 mb-1">
                                Ghi chú
                            </label>
                            <input
                                type="text"
                                name="transaction-notes"
                                id="transaction-notes"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                                value={note}
                                onChange={(v) => { setNote(v.target.value) }}
                            />
                        </div>

                        <div className="flex items-end space-x-3 pt-6 sm:pt-0 ml-auto">
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="repeat-transaction"
                                        name="repeat-transaction"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={isRepeated}
                                        onChange={(v) => { setIsRepeated(!isRepeated) }}
                                    />
                                </div>
                                <div className="ml-2 text-sm">
                                    <label htmlFor="repeat-transaction" className="font-medium text-gray-600 whitespace-nowrap">
                                        Lặp lại giao dịch
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!(date != undefined && selectedCategoryId != null && amount != 0)}
                                className={`inline-flex justify-center rounded-md border border-transparent
                                            px-6 py-2 text-sm font-bold shadow-sm
                                            text-white bg-gray-400 hover:bg-gray-600
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                            disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
                                            transition-colors duration-150 ease-in-out`}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}