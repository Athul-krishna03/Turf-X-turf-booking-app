import { ArrowUpRight, Plus } from "lucide-react";

type QuickActionsProps = {
  onAddMoney: () => void;
  onSendMoney: () => void;
};

export const QuickActions = ({ onAddMoney, onSendMoney }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={onAddMoney}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl flex items-center justify-center gap-4 transition-all transform hover:scale-105 shadow-lg"
      >
        <div className="bg-white/20 p-3 rounded-full">
          <Plus className="w-6 h-6" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-lg">Add Money</div>
          <div className="text-green-100 text-sm">Credit to wallet</div>
        </div>
      </button>
      <button
        onClick={onSendMoney}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl flex items-center justify-center gap-4 transition-all transform hover:scale-105 shadow-lg"
      >
        <div className="bg-white/20 p-3 rounded-full">
          <ArrowUpRight className="w-6 h-6" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-lg">Send Money</div>
          <div className="text-blue-100 text-sm">Transfer funds</div>
        </div>
      </button>
    </div>
  );
};