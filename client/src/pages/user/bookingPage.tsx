"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,} from "../../components/ui/alert-dialog";
import {
  CalendarIcon,
  Clock,
  LayoutGrid,
  History,
  CalendarClock,
  ArrowUpRight,
  Users,
  ArrowLeft,
} from "lucide-react";

import BookingCard from "../../components/booking/booking-card";
import { cancelBooking, getAllBookings } from "../../services/user/userServices";
import { BookingResponse } from "../../types/BookingTypes";
import { BookingType } from "../../types/Booking";
import { JoinedGameBooking } from "../../types/joinedGame";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";

export default function BookingsPage() {
  const user = useSelector((state: any) => state.user.user)
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookingType,setBookingType] = useState("single")
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingType| null>(null);
  const [joinedBooking,setJoinedBooking] = useState< JoinedGameBooking | null>(null)
  const [bookingData, setBookingData] = useState<BookingResponse>({
    upcoming: [],
    past: [],
    joinedGames:{
      upcoming:[],
      past:[]                 
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const data = await getAllBookings();
        setBookingData(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        setBookingData({ upcoming: [], past: [] ,joinedGames:{
          upcoming:[],
          past:[]
        }});
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = (booking: BookingType | JoinedGameBooking, type: string) => {
    if (type === "joined") {
      setJoinedBooking(booking as JoinedGameBooking);
      setBookingType(type);
      setIsCancelDialogOpen(true);
    } else {
      setSelectedBooking(booking as BookingType);
      setBookingType(type);
      setIsCancelDialogOpen(true);
    }
  };

  const confirmCancel = async () => {
    if(bookingType == "single"){
      const bookingId = selectedBooking?selectedBooking.id:null
      const result  = await cancelBooking(bookingId,bookingType)
      if(result){
        toast.success("Booking cancelled successfully");
        setBookingData((prev) => ({
        ...prev,
        upcoming: prev.upcoming.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b),
      }));
        
      }else{
        toast.error("Failed to cancel booking");
      }

    }else{
      const bookingId = joinedBooking?joinedBooking.id:null
      const isHost = joinedBooking?joinedBooking.joinedUsers[0]._id == user.id : false
      console.log("isHost",isHost,joinedBooking?.joinedUsers[0]._id,user.id);
      const result  = await cancelBooking(bookingId,bookingType,isHost)
      if(result){
        toast.success("Joined game cancelled successfully");
        setBookingData((prev) => ({
          ...prev,
          joinedGames: {
            upcoming: prev.joinedGames.upcoming.filter(b => b.id !== bookingId),
            past: prev.joinedGames.past.filter(b => b.id !== bookingId),
          }
        }));
        
      }else{
        toast.error("Failed to cancel joined game");
      }
    }
    
    setIsCancelDialogOpen(false);
  };

  // Loading state UI
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-black-800 text-white overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate("/")} 
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
          </div>
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-400">
              View and manage all your turf bookings in one place
            </p>
          </header>

          <Tabs
            defaultValue="upcoming"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-green-400">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <CalendarClock size={18} />
                <span>Upcoming</span>
                {bookingData.upcoming.length > 0 && (
                  <span className="ml-1 bg-gray-800 text-white px-2 py-0.5 rounded-full text-xs">
                    {bookingData.upcoming.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <History size={18} />
                <span>Past</span>
                {bookingData.past.length > 0 && (
                  <span className="ml-1 bg-gray-800 text-white px-2 py-0.5 rounded-full text-xs">
                    {bookingData.past.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="joined"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Users size={18} />
                <span>Joined</span>
                {bookingData.joinedGames.upcoming.length +  bookingData.joinedGames.past.length> 0 && (
                  <span className="ml-1 bg-gray-800 text-white px-2 py-0.5 rounded-full text-xs">
                    {bookingData.joinedGames.upcoming.length +  bookingData.joinedGames.past.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {bookingData.upcoming.length === 0 ? (
                <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-4">
                    <CalendarIcon size={36} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">
                    No upcoming bookings
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    You don't have any upcoming bookings at the moment. Ready to
                    reserve a turf?
                  </p>
                  <Button
                    asChild
                    className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    <a href="/" className="flex items-center gap-2">
                      <LayoutGrid size={18} />
                      Find a turf
                      <ArrowUpRight size={16} className="ml-1" />
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {bookingData.upcoming.map((booking:BookingType) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={() => handleCancel(booking,"single")}
                      showActions={true}
                      type="normal"
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {bookingData.past.length === 0 ? (
                <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-4">
                    <Clock size={36} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">No past bookings</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    You haven't made any bookings yet. Start by finding a turf
                    that meets your needs.
                  </p>
                  <Button
                    asChild
                    className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    <a href="/" className="flex items-center gap-2">
                      <LayoutGrid size={18} />
                      Find a turf
                      <ArrowUpRight size={16} className="ml-1" />
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {bookingData.past.map((booking:BookingType) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={() => {}}
                      showActions={false}
                      type="normal"
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="joined" className="space-y-6">
              {bookingData.joinedGames.upcoming.length === 0 &&
                bookingData.joinedGames.past.length === 0 ? (
                <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-4">
                    <Clock size={36} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">No joined games</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    You haven't joined any hosted games yet.
                  </p>
                  <Button
                    asChild
                    className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    <a href="/" className="flex items-center gap-2">
                      <LayoutGrid size={18} />
                      Find a turf
                      <ArrowUpRight size={16} className="ml-1" />
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {bookingData.joinedGames.upcoming.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold">Upcoming Joined Games</h3>
                      <div className="grid gap-6">
                        {bookingData.joinedGames.upcoming.map((game) => (
                          <BookingCard
                            key={game.id}
                            booking={game}
                            showActions={true}
                            onCancel={() => handleCancel(game,"joined")}
                            type="joined"
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {bookingData.joinedGames.past.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold mt-6">Past Joined Games</h3>
                      <div className="grid gap-6">
                        {bookingData.joinedGames.past.map((game) => (
                          <BookingCard
                            key={game.id}
                            booking={game}
                            showActions={false}
                            onCancel={() => {}}
                            type="joined"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Cancel Booking Alert Dialog */}
        <AlertDialog
          open={isCancelDialogOpen}
          onOpenChange={setIsCancelDialogOpen}
        >
          <AlertDialogContent className="bg-gray-900 border-gray-800 max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                Cancel Booking
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to cancel your booking at{" "}
                <span className="text-white font-medium">
                  {selectedBooking?.turfName}
                </span>{" "}
                on{" "}
                <span className="text-white font-medium">
                  {selectedBooking &&
                    format(new Date(selectedBooking.date), "PPP")}
                </span>{" "}
                at{" "}
                <span className="text-white font-medium">
                  {selectedBooking?.startTime}
                </span>
                ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="border-gray-700 hover:bg-gray-800">
                No, keep it
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmCancel}
                className="bg-rose-600 hover:bg-rose-700 transition-colors"
              >
                Yes, cancel booking
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}