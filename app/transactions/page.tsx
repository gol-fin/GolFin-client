import Header from '@/components/Header';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import { FiMeh } from 'react-icons/fi';

interface Transaction {
    id: string;
    date: Date; // Changed from string to Date
    category: string;
    amount: number;
    type: 'income' | 'expense';
    notes?: string | null;
}

export default function TransactionsPage() {
    const summaryData = [
        { title: 'Ngân sách còn lại', value: '0.00 VND' },
        { title: 'Ngân sách mỗi ngày', value: '0.00 VND' },
        { title: 'Tổng thu nhập', value: '0.00 VND' },
        { title: 'Tổng chi phí', value: '0.00 VND' },
    ];

    const transactionsData: Transaction[] = [
        { id: 't1', date: new Date(2025, 2, 25), category: 'Trợ cấp', amount: 100000, type: 'income', notes: 'Từ bố mẹ' }, // Month is 0-indexed (2 = March)
        { id: 't2', date: new Date(2025, 2, 23), category: 'Ăn uống', amount: 30000, type: 'expense', notes: null },
        { id: 't3', date: new Date(2025, 2, 23), category: 'Di chuyển', amount: 15000, type: 'expense', notes: 'Xe buýt' },
        { id: 't4', date: new Date(2025, 2, 22), category: 'Lương', amount: 5000000, type: 'income', notes: 'Tháng 3' },
    ];

    const hasTransactions = transactionsData.length !== 0;

    return (
        <div className="min-h-full">
            <Header activeTab="Giao dịch" />

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-center">
                        <TransactionForm />
                    </div>

                    <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {summaryData.map((item) => (
                            <div key={item.title} className="overflow-hidden rounded-lg border border-gray-300 bg-white px-4 py-5 shadow-sm sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">{item.title}</dt>
                                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">{item.value}</dd>
                            </div>
                        ))}
                    </div>

                    {hasTransactions ? (
                        <div>
                            <p className="text-center text-gray-700">Transaction list would go here...</p>
                            <TransactionList transactions={transactionsData} />
                        </div>
                    ) : (
                        <div className="mt-12 flex flex-col items-center justify-center text-center">
                            <FiMeh className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">Bạn đang không có giao dịch nào</h3>
                            {/* <p className="mt-1 text-sm text-gray-500">Get started by creating a new transaction.</p> */}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}