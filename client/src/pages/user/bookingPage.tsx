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
} from "lucide-react";

import BookingCard from "../../components/booking/booking-card";
import { cancelBooking, getAllBookings } from "../../services/user/userServices";
import { BookingResponse } from "../../types/BookingTypes";
import { BookingType } from "../../types/Booking";
import { JoinedGameBooking } from "../../types/joinedGame";



export default function BookingsPage() {
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

  const handleCancel = (booking: BookingType,type:string) => {
    if(type = "joined"){

    }
    setSelectedBooking(booking);
    setBookingType(type);
    setIsCancelDialogOpen(true);
  };

  const confirmCancel = async () => {
    if(bookingType == "single"){
      const bookingId = selectedBooking?selectedBooking.id:null
      const result  = await cancelBooking(bookingId,bookingType)
    }
    
    setIsCancelDialogOpen(false);
  };

  // Loading state UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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
                onCancel={() => {}}
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
  );
}
