import { ArrowDownLeft, ArrowUpRight, Calendar, Search, Wallet } from "lucide-react";

type TransactionFilterProps = {
    filter: string;
    setFilter: (filter: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

type Transaction = {
    type: 'credit' | 'debit';
    amount: number;
    date: string;
    description?: string;
};


type TransactionHistoryProps = {
    transactions: Transaction[];
    filter: string;
    searchTerm: string;
};

export const TransactionFilter = ({ filter, setFilter, searchTerm, setSearchTerm }: TransactionFilterProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
            />
        </div>
        <div className="flex gap-2">
            {['all', 'credit', 'debit'].map((type) => (
            <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-3 rounded-xl font-medium transition-colors capitalize ${
                filter === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
                {type}
            </button>
            ))}
        </div>
        </div>
    );
};


export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isCredit = transaction.type === 'credit';
    const IconComponent = isCredit ? ArrowDownLeft : ArrowUpRight;
    const amountColor = isCredit ? 'text-green-400' : 'text-red-400';
    const bgColor = isCredit ? 'bg-green-500/10' : 'bg-red-500/10';
    const borderColor = isCredit ? 'border-green-500/20' : 'border-red-500/20';
    
    return (
        <div className={`bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-6 rounded-xl border ${borderColor} hover:border-gray-600 transition-all`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${bgColor}`}>
                <IconComponent className={`w-5 h-5 ${amountColor}`} />
            </div>
            <div>
                <div className="text-white font-semibold text-lg">
                {transaction.description || (isCredit ? 'Money Added' : 'Money Sent')}
                </div>
                <div className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                {new Date(transaction.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </div>
            </div>
            </div>
            <div className="text-right">
            <div className={`text-xl font-bold ${amountColor}`}>
                {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm capitalize">
                {transaction.type}
            </div>
            </div>
        </div>
        </div>
    );
};


export const TransactionHistory = ({ transactions, filter, searchTerm }: TransactionHistoryProps) => {
    console.log("Transaction History Rendered", transactions, filter, searchTerm);
    const filteredTransactions = transactions && transactions.filter(transaction => {
        const matchesFilter = filter === 'all' || transaction.type === filter;
        const matchesSearch = !searchTerm || 
        transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    if (filteredTransactions.length === 0) {
        return (
        <div className="bg-gray-900/50 p-12 rounded-2xl border border-gray-800 text-center">
            <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Transactions Found</h3>
            <p className="text-gray-500">
            {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Your transaction history will appear here'}
            </p>
        </div>
        );
    }

    return (
        <div className="space-y-4">
        {filteredTransactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
        ))}
        </div>
    );
};