
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/layout/Sidebar";
import { Menu, TrendingUp } from "lucide-react";
import { BalanceCard } from "../../components/wallet/balanceCard";
import { QuickActions } from "../../components/wallet/quickAction";
import { TransactionFilter, TransactionHistory } from "../../components/wallet/tranctionSection";
import { getWalletData } from "../../services/user/userServices";

type Transaction = {
    type: 'credit' | 'debit';
    amount: number;
    date: string;
    description: string;
};

type WalletData = {
    userId: string;
    userType: string;
    balance: number;
    transaction: Transaction[];
};

const WalletPage =  () => {
    const [showBalance, setShowBalance] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [walletData,setWalletData] = useState<WalletData | undefined>();
    
    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const response = await getWalletData();
                setWalletData(response.data);
                console.log("Fetched wallet data:", response.data);
            } catch (error) {
                console.error("Error fetching wallet data:", error);
            }
        };

        fetchWalletData();
    }, []);
    const handleAddMoney = () => {
        console.log('Add money clicked');
    };

    const handleSendMoney = () => {
        console.log('Send money clicked');
    };

    const toggleBalance = () => {
        setShowBalance(!showBalance);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
            <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header - Fixed */}
                <header className="flex-shrink-0 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                                className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-white">My Wallet</h1>
                                <p className="text-gray-400 mt-1">Manage your funds and transactions</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Balance and Quick Actions */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                <div className="xl:col-span-2">
                                    <BalanceCard 
                                        balance={walletData?.balance ?? 0}
                                        showBalance={showBalance}
                                        toggleBalance={toggleBalance}
                                    />
                                </div>
                                {/* <div>
                                    <QuickActions 
                                        onAddMoney={handleAddMoney}
                                        onSendMoney={handleSendMoney}
                                    />
                                </div> */}
                            </div>

                            {/* Transaction History */}
                            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-8 rounded-2xl border border-gray-700">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-blue-500/20 p-3 rounded-full">
                                        <TrendingUp className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                                        <p className="text-gray-400">View all your wallet transactions</p>
                                    </div>
                                </div>

                                <TransactionFilter 
                                    filter={filter}
                                    setFilter={setFilter}
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                />

                                <TransactionHistory 
                                    transactions={walletData?.transaction ?? []}
                                    filter={filter}
                                    searchTerm={searchTerm}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WalletPage;