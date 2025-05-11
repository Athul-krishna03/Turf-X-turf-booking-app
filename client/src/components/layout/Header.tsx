import { Search, Bell, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
    const navigate = useNavigate()
  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      <div className="flex items-center w-1/2">
        <button 
          className="md:hidden mr-4 text-gray-400"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search venues..."
            className="w-full bg-gray-800 text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Find Turf
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors" onClick={()=>navigate("/user/bookings")}>
          My Bookings
        </a>
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </button>
        <button 
          onClick={() => navigate('/user/profile')} 
          className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <User size={16} className="text-gray-300" />
        </button>
      </div>
    </header>
  );
};
