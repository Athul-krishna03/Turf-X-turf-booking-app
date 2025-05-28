import { Eye, EyeOff, Wallet } from "lucide-react";

type BalanceCardProps = {
  balance: number;
  showBalance: boolean;
  toggleBalance: () => void;
};

export const BalanceCard = ({ balance, showBalance, toggleBalance }: BalanceCardProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-green-500/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-full">
            <Wallet className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-semibold">Wallet Balance</h2>
            <p className="text-gray-400 text-sm">Available funds</p>
          </div>
        </div>
        <button
          onClick={toggleBalance}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
        >
          {showBalance ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </button>
      </div>
      <div className="text-5xl font-bold text-white mb-2">
        {showBalance ? `₹${balance}` : '••••••'}
      </div>
      <div className="text-green-400 text-lg">Current Balance</div>
    </div>
  );
};
