"use client"

import { useState } from "react"

import { format } from "date-fns"
import { Calendar } from "../../components/ui/calendar"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { MapPin, Star, Clock, Users, Droplets, ShowerHead, Utensils, Wifi, Car, ChevronLeft, Heart } from "lucide-react"
import BookingSlots from "../../components/booking/booking-slots"
import BookingConfirmation from "../../components/booking/booking-confirmation"
import TurfGallery from "../../components/turf/turf-gallery"
import { useParams } from "react-router-dom"

// Mock data - in a real app, this would come from an API
const turfData = {
  id: "1",
  name: "Greenway Arena",
  rating: 4.5,
  reviews: 128,
  location: {
    address: "123 Sports Lane, Koramangala",
    city: "Bangalore",
    distance: "1.3 km away",
  },
  description:
    "Premium football turf with state-of-the-art facilities. Perfect for casual games and tournaments alike. The turf features high-quality artificial grass that provides excellent ball control and player comfort.",
  price: {
    hourly: 1200,
    currency: "₹",
  },
  sports: ["Football", "Cricket"],
  amenities: [
    { name: "Changing Rooms", icon: <Users size={16} /> },
    { name: "Water Dispenser", icon: <Droplets size={16} /> },
    { name: "Showers", icon: <ShowerHead size={16} /> },
    { name: "Cafeteria", icon: <Utensils size={16} /> },
    { name: "Free WiFi", icon: <Wifi size={16} /> },
    { name: "Parking", icon: <Car size={16} /> },
  ],
  photos: [
    "https://res.cloudinary.com/dlvudhlgl/image/upload/v1745997571/iip5tokjk28uy8t6cohw.jpg",
    "https://res.cloudinary.com/dlvudhlgl/image/upload/v1745998004/fg0coqqzusq6ehfwyxna.jpg",
    "https://res.cloudinary.com/dlvudhlgl/image/upload/v1745998004/fg0coqqzusq6ehfwyxna.jpg",
    "https://res.cloudinary.com/dlvudhlgl/image/upload/v1745998004/fg0coqqzusq6ehfwyxna.jpg"
  ],
  openingHours: {
    weekdays: "6:00 AM - 11:00 PM",
    weekends: "6:00 AM - 12:00 AM",
  },
}

export default function TurfDetailsPage() {
  const { id } = useParams()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(1)
  const [bookingStep, setBookingStep] = useState<"calendar" | "slots" | "confirmation">("calendar")

  // Mock available slots - in a real app, these would be fetched based on the selected date
  const getAvailableSlots = (date: Date | undefined) => {
    if (!date) return []

    // Generate slots from 6 AM to 10 PM
    const slots = []
    for (let hour = 6; hour <= 22; hour++) {
      // Skip some slots to simulate unavailability
      if (hour !== 9 && hour !== 15 && hour !== 19) {
        slots.push(`${hour}:00`)
      }
    }
    return slots
  }

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
    setBookingStep("confirmation")
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    setBookingStep("slots")
  }

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration)
  }

  const handleBackToCalendar = () => {
    setBookingStep("calendar")
  }

  const handleBackToSlots = () => {
    setBookingStep("slots")
  }

  const handleConfirmBooking = () => {
    // In a real app, this would send the booking data to an API
    alert(`Booking confirmed for ${format(date!, "PPP")} at ${selectedSlot} for ${duration} hour(s)`)
    // Reset the booking flow
    setBookingStep("calendar")
    setSelectedSlot(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => window.history.back()}>
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
      </div>

      {/* Turf Gallery */}
      <div className="container mx-auto px-4 py-4">
      <TurfGallery photos={turfData.photos} turfName={turfData.name} />
      </div>
      

      {/* Turf Details */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Turf Information */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{turfData.name}</h1>
                <div className="flex items-center mt-2 text-gray-400">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">
                    {turfData.location.address}, {turfData.location.city}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">{turfData.location.distance}</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span>{turfData.rating}</span>
                    <span className="text-gray-400 ml-1">({turfData.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart size={18} />
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">About this venue</h2>
                <p className="text-gray-300">{turfData.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Sports</h2>
                <div className="flex flex-wrap gap-2">
                  {turfData.sports.map((sport) => (
                    <Badge key={sport} variant="outline" className="bg-gray-800 hover:bg-gray-700">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {turfData.amenities.map((amenity) => (
                    <div key={amenity.name} className="flex items-center">
                      <div className="mr-2 text-green-500">{amenity.icon}</div>
                      <span className="text-gray-300">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Opening Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-400">Weekdays</p>
                      <p>{turfData.openingHours.weekdays}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-400">Weekends</p>
                      <p>{turfData.openingHours.weekends}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:w-1/3">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Book this venue</h2>
                <div className="mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">
                      {turfData.price.currency}
                      {turfData.price.hourly}
                    </span>
                    <span className="text-gray-400">per hour</span>
                  </div>
                </div>

                <Tabs defaultValue="booking" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="booking">Booking</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="booking" className="space-y-4">
                    {bookingStep === "calendar" && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Select a date</h3>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          className="rounded-md border border-gray-800 bg-gray-950"
                          disabled={(date: any) => date < new Date()}
                        />
                      </div>
                    )}

                    {bookingStep === "slots" && date && (
                      <BookingSlots
                        date={date}
                        availableSlots={getAvailableSlots(date)}
                        onSlotSelect={handleSlotSelect}
                        onBack={handleBackToCalendar}
                      />
                    )}

                    {bookingStep === "confirmation" && date && selectedSlot && (
                      <BookingConfirmation
                        date={date}
                        slot={selectedSlot}
                        duration={duration}
                        price={turfData.price.hourly}
                        currency={turfData.price.currency}
                        onDurationChange={handleDurationChange}
                        onBack={handleBackToSlots}
                        onConfirm={handleConfirmBooking}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="info">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Cancellation Policy</h3>
                        <p className="text-sm text-gray-400">
                          Free cancellation up to 24 hours before your booking. After that, a 50% fee applies.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Rules</h3>
                        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                          <li>Proper sports shoes required</li>
                          <li>No food or drinks on the playing area</li>
                          <li>Arrive 15 minutes before your slot</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
