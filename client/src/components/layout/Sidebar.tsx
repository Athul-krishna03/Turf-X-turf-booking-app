import { useState } from 'react';
import { Home, Calendar, Star, Settings, MessageSquare, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLogout } from '../../hooks/auth/useAuth';
import {  userLogout } from '../../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
    const [activeTab, setActiveTab] = useState('home');
    const dispatch = useDispatch();
    const Logout = useLogout();
    const navigate = useNavigate()
    const navigationItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Bookings' },
    { id: 'favorites', icon: <Star size={20} />, label: 'Favorites' },
    { id: 'messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' }
    ];
    const handleLogout= async ()=>{
        try {
            const reponse = await Logout.mutateAsync()
            console.log(reponse)
            dispatch(userLogout())
        } catch (error) {
            console.error("Logout error:", error);
            dispatch(userLogout());
        }
    }
return (
    <div className={cn(
      "bg-gray-900 flex flex-col transition-all duration-300 ease-in-out",
      isExpanded ? "w-64" : "w-16"
    )}>
      {/* Logo */}
      <div className="p-4 flex items-center cursor-pointer" onClick={onToggle}>
        <img src="/turf_x.png" alt="Turf-X Logo" className="h-8 w-8" />
        <span className={cn(
          "ml-3 font-bold text-green-500 transition-opacity duration-300",
          isExpanded ? "opacity-100" : "opacity-0 hidden"
        )}>
          Turf-X
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center w-full py-3 px-4 transition-colors",
                  activeTab === item.id
                    ? 'bg-green-600 text-white border-l-4 border-green-400'
                    : 'text-gray-400 hover:bg-gray-800',
                  "rounded-l-md"
                )}
              >
                <div className="flex items-center justify-center w-8">
                  {item.icon}
                </div>
                <span className={cn(
                  "ml-3 transition-opacity duration-300",
                  isExpanded ? "opacity-100" : "opacity-0 hidden"
                )}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <button 
          className={cn(
            "flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors",
          )}
        >
          <LogOut className="h-5 w-5" />
          <span className={cn(
            "ml-3 transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0 hidden"
          )} onClick={handleLogout}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};
