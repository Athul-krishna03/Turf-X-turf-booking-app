"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog"
import { Calendar } from "../../components/ui/calendar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import {
  MapPin,
  CalendarIcon,
  Clock,
  AlertCircle,
  LayoutGrid,
  History,
  CalendarClock,
  ArrowUpRight,
} from "lucide-react"

import BookingCard from "../../components/booking/booking-card"
import { getAllBookings } from "../../services/user/userServices"
import { Booking } from "../../types/Type"

type BookingResponse = {
  upcoming: Booking[]
  past: Booking[]
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [newDate, setNewDate] = useState<Date | undefined>(undefined)
  const [bookingData, setBookingData] = useState<BookingResponse>({ upcoming: [], past: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      try {
        const data = await getAllBookings()
        setBookingData(data)
      } catch (error) {
        console.error("Failed to fetch bookings", error)
        setBookingData({ upcoming: [], past: [] })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleReschedule = (booking: any) => {
    setSelectedBooking(booking)
    setNewDate(new Date(booking.date))
    setIsRescheduleDialogOpen(true)
  }

  const handleCancel = (booking: any) => {
    setSelectedBooking(booking)
    setIsCancelDialogOpen(true)
  }

  const confirmReschedule = () => {
    // In a real app, this would call an API to reschedule the booking
    alert(`Booking for ${selectedBooking.turfName} rescheduled to ${format(newDate!, "PPP")}`)
    setIsRescheduleDialogOpen(false)
  }

  const confirmCancel = () => {
    // In a real app, this would call an API to cancel the booking
    alert(`Booking for ${selectedBooking.turfName} has been cancelled`)
    setIsCancelDialogOpen(false)
  }

  // Loading state UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-400">View and manage all your turf bookings in one place</p>
        </header>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-900">
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
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {bookingData.upcoming.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 p-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-4">
                  <CalendarIcon size={36} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-3">No upcoming bookings</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  You don't have any upcoming bookings at the moment. Ready to reserve a turf?
                </p>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  <a href="/" className="flex items-center gap-2">
                    <LayoutGrid size={18} />
                    Find a turf
                    <ArrowUpRight size={16} className="ml-1" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookingData.upcoming.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onReschedule={() => handleReschedule(booking)}
                    onCancel={() => handleCancel(booking)}
                    showActions={true}
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
                  You haven't made any bookings yet. Start by finding a turf that meets your needs.
                </p>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  <a href="/" className="flex items-center gap-2">
                    <LayoutGrid size={18} />
                    Find a turf
                    <ArrowUpRight size={16} className="ml-1" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookingData.past.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onReschedule={() => {}}
                    onCancel={() => {}}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Reschedule Booking</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-5">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
                    <img
                      src={selectedBooking.turfImage[0] || "/placeholder.svg"}
                      alt={selectedBooking.turfName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{selectedBooking.turfName}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin size={14} className="mr-1" />
                      <span>{selectedBooking.location?.city}, {selectedBooking.location?.state}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm bg-gray-900 p-2 rounded-md">
                  <CalendarIcon size={14} className="mr-2 text-gray-400" />
                  <span>
                    Current: <span className="text-white">{format(new Date(selectedBooking.date), "PPP")}</span>,{" "}
                    <span className="text-white">{selectedBooking.startTime} - {selectedBooking.endTime}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-300">Select a new date</h4>
                <Calendar
                  mode="single"
                  selected={newDate}
                  onSelect={setNewDate}
                  className="rounded-md border border-gray-800 bg-gray-950 mx-auto"
                  disabled={(date) => date < new Date()}
                  classNames={{
                    day_selected: "bg-indigo-600 text-white hover:bg-indigo-700",
                    day_today: "bg-gray-800 text-white",
                  }}
                />
              </div>

              <div className="text-sm text-amber-400 flex items-center p-3 bg-amber-950/30 border border-amber-900/50 rounded-lg">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span>After selecting a new date, you'll be able to choose from available time slots.</span>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsRescheduleDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmReschedule} 
              disabled={!newDate}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Alert Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to cancel your booking at{" "}
              <span className="text-white font-medium">{selectedBooking?.turfName}</span> on{" "}
              <span className="text-white font-medium">
                {selectedBooking && format(new Date(selectedBooking.date), "PPP")}
              </span> at{" "}
              <span className="text-white font-medium">{selectedBooking?.startTime}</span>?
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
  )
}