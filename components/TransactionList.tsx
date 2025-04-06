// src/components/TransactionList.tsx

import React from 'react';
// Import specific formatters needed
import { formatDateForDisplay, formatCurrency, formatDateToKey } from '@/lib/formatters'; // Adjust import path
import { parseISO } from 'date-fns'; // Import parseISO to convert string keys back for display header

interface Transaction {
    id: string;
    date: Date; 
    category: string;
    amount: number;
    type: 'income' | 'expense';
    notes?: string | null;
}

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {

    // Group transactions by date using a consistent string key (YYYY-MM-DD)
    const groupedTransactions = transactions.reduce((acc, transaction) => {
        // Use the helper to get the YYYY-MM-DD string key
        const dateKey = formatDateToKey(transaction.date);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(transaction);
        return acc;
    }, {} as Record<string, Transaction[]>);

    // Sort date keys (YYYY-MM-DD strings are lexicographically sortable in chrono order)
    // For reverse chronological (most recent first):
    const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));
    // For chronological (oldest first):
    // const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => a.localeCompare(b));

    if (transactions.length === 0) {
        return <p className="text-center text-gray-500 py-4">Không có giao dịch nào.</p>;
    }

    return (
        <div className="w-full space-y-4">
            {sortedDateKeys.map((dateKey, groupIndex) => (
                <div key={dateKey}>
                    {/* Date Header - Parse the key back to Date for display formatting */}
                    <h3 className="mb-2 text-sm font-bold text-gray-800">
                        {formatDateForDisplay(parseISO(dateKey))} {/* Use parseISO to convert key back */}
                    </h3>

                    {/* Transactions for this date */}
                    <ul className="space-y-2">
                        {groupedTransactions[dateKey].map((transaction) => (
                            <li key={transaction.id} className="flex items-center justify-between text-sm">
                                {/* Left side: Category and Notes */}
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <span>{transaction.category}</span>
                                    {transaction.notes && (
                                        <span className="text-xs text-gray-400">
                                            Ghi chú: {transaction.notes}
                                        </span>
                                    )}
                                </div>

                                {/* Right side: Amount */}
                                <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-gray-800'
                                    }`}>
                                    {formatCurrency(transaction.amount, transaction.type)}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Separator Line */}
                    {groupIndex < sortedDateKeys.length - 1 && (
                        <hr className="mt-4 border-gray-200" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default TransactionList;