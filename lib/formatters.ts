// src/utils/formatters.ts (or wherever your helpers are)
import { format } from 'date-fns'; // Import format from date-fns

/**
 * Formats a Date object into DD/MM/YYYY format.
 */
export const formatDateForDisplay = (date: Date): string => {
    try {
        // Use date-fns format function
        return format(date, 'dd/MM/yyyy');
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date"; // Return an error string
    }
};

/**
 * Formats a number into currency string with thousand separators (Vietnamese style).
 * Adds '+' for income, '-' for expense.
 * (No changes needed here for the date type change)
 */
export const formatCurrency = (amount: number, type: 'income' | 'expense'): string => {
    const formatter = new Intl.NumberFormat('vi-VN');
    const formattedAmount = formatter.format(amount);
    return type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`;
};

/**
 * NEW Helper: Formats a Date object into a consistent string key (YYYY-MM-DD).
 * This is crucial for grouping transactions by day correctly.
 */
export const formatDateToKey = (date: Date): string => {
    try {
        return format(date, 'yyyy-MM-dd');
    } catch (error) {
        console.error("Error formatting date to key:", error);
        return "invalid-date-key"; // Provide a fallback key
    }
}