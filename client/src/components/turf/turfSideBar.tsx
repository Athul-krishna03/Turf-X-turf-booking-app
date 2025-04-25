
import {
    BarChart,
    CalendarDays,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Settings,
    Users,
    Wallet,
  } from "lucide-react"
  import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { turfLogout } from "../../store/slices/turf.slice";
import { toast } from "../../hooks/useToast";



const TurfSideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout=()=>{
      dispatch(turfLogout());
      toast({
          title: "Success!",
          description: "logout successful!",
          duration: 3000,
        });
      navigate("/turf/login")
    }
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-bold">Turf Dashboard</h2>
    </div>

    <nav className="flex-1 p-4 space-y-1">
      <Button variant="ghost" className="w-full justify-start gap-3">
        <LayoutDashboard size={18} />
        Dashboard
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
        <CalendarDays size={18} />
        Bookings
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
        <Users size={18} />
        Customers
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
        <Wallet size={18} />
        Payments
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
        <BarChart size={18} />
        Analytics
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
        <MessageSquare size={18} />
        Messages
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
        <Settings size={18} />
        Settings
      </Button>
    </nav>

    <div className="p-4 border-t border-gray-200">
      <Button variant="ghost" className="w-full justify-start gap-3 text-red-600" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </Button>
    </div>
  </aside>
  )
}

export default TurfSideBar