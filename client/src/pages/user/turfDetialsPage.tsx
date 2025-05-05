import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin, Star, Clock, Users, Droplets, ShowerHead, Utensils, Wifi, Car, ChevronLeft,
  Heart, Calendar, CheckCircle2, Phone, Mail,Shield
} from "lucide-react";
import { Calendar as CalendarComponent } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import BookingSlots from "../../components/booking/booking-slots";
import BookingConfirmation from "../../components/booking/booking-confirmation";
import TurfGallery from "../../components/turf/turf-gallery";
import { ITurf, Turf } from "../../types/Type";
import { slots } from "../../services/user/userServices";
import { toast } from "sonner";
import { Slot } from "../../types/SlotsType";

// Map amenities to icons and descriptions
const amenityIcons: Record<string, { icon: any; description: string }> = {
  Parking: { icon: Car, description: "Free parking available" },
  Toilet: { icon: Droplets, description: "Clean washroom facilities" },
  "Changing Rooms": { icon: ShowerHead, description: "Changing rooms available" },
  Washrooms: { icon: Droplets, description: "Washroom facilities" },
  Cafeteria: { icon: Utensils, description: "On-site cafeteria" },
  "Wi-Fi": { icon: Wifi, description: "Free Wi-Fi access" },
  "Spectator Seating": { icon: Users, description: "Seating for spectators" },
};

export default function TurfDetailsPage() {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [turfData, setTurfData] = useState<ITurf | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [duration, setDuration] = useState<number>(1);
  const [bookingStep, setBookingStep] = useState<"calendar" | "slots" | "confirmation">("calendar");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { turfId } = useParams<{ turfId: string }>();
  const allTurfData = useSelector((state: any) => state?.turfs?.turfs);

  useEffect(() => {
    if (turfId && allTurfData && allTurfData.length > 0) {
      const matchedTurf = allTurfData.find((turf: Turf) =>
        String(turf.turfId) === String(turfId)
      );
      if (matchedTurf) {
        setTurfData(matchedTurf);
      } else {
        toast.error("Could not find turf details");
      }
    }
  }, [turfId, allTurfData]);

  const getAvailableSlots = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setIsLoading(true);
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    try {
      const response = await slots(turfId as string, formattedDate);
      setAvailableSlots(response.data || []);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
      toast.error("Failed to fetch available slots");
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setBookingStep("confirmation");
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      getAvailableSlots(selectedDate);
    }
    setBookingStep("slots");
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleBackToCalendar = () => {
    setBookingStep("calendar");
  };

  const handleBackToSlots = () => {
    setBookingStep("slots");
  };

  const handleConfirmBooking = () => {
    toast.success(
      <div className="flex flex-col">
        <span className="font-semibold">Booking Confirmed!</span>
        <span className="text-sm">
          {format(date!, "PPP")} at {selectedSlot?.startTime} for {duration} hour(s)
        </span>
      </div>
    );
    setBookingStep("calendar");
    setSelectedSlot(null);
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerCaseAmenity = amenity.toLowerCase();
    for (const [key, value] of Object.entries(amenityIcons)) {
      if (lowerCaseAmenity.includes(key.toLowerCase())) {
        return value.icon;
      }
    }
    return CheckCircle2;
  };

  if (!turfData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-700 rounded mb-4"></div>
          <div className="text-gray-400">Loading turf details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 hover:bg-gray-800 transition-colors"
          onClick={() => window.history.back()}
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-4">
        <TurfGallery photos={turfData?.turfPhotos} turfName={turfData?.name} />
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {turfData?.name}
                </h1>
                <div className="flex items-center mt-2 text-gray-400">
                  <MapPin size={16} className="mr-1 text-green-400" />
                  <span className="text-sm">
                    {turfData?.location?.address}, {turfData?.location?.city}, {turfData?.location?.state}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex items-center bg-gray-800/60 px-3 py-1 rounded-full">
                    <Star size={14} className="text-green-400 mr-1" />
                    <span className="text-sm font-medium text-white">4.8</span>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">(120+ reviews)</span>
                </div>
                <Badge className="mt-2 bg-green-900/50 text-green-300 border-green-700">
                  Verified Venue
                </Badge>
              </div>
              <Button
                size="icon"
                className="rounded-full hover:bg-gray-800 hover:text-green-400 transition-colors"
              >
                <Heart size={18} />
              </Button>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-8">
              <Card className="bg-gray-900/80 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                      About this venue
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    Denfield is a premier sports venue in Irinjalakuda, Kerala, offering a spacious 11 vs 11 football court perfect for competitive matches. Equipped with essential amenities like parking and clean washrooms, it ensures a hassle-free experience. Established in April 2025, Denfield is ideal for sports enthusiasts seeking a quality turf.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                      Sports & Court
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield size={18} className="text-green-400" />
                    <span className="text-gray-300">Court Size: {turfData?.courtSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {turfData?.sports?.map((sport: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-green-900/30 to-green-900/20 hover:from-green-800/40 hover:to-green-800/30 text-gray-200 border border-green-900/50 py-1.5 px-3 transition-all duration-300"
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                      Amenities
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {turfData?.aminities?.map((amenity: string, index: number) => {
                        const IconComponent = getAmenityIcon(amenity);
                        const description = amenityIcons[amenity]?.description || "Facility available";
                        return (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-3 group">
                                <div className="p-3 rounded-full bg-gray-800/60 text-green-400 group-hover:bg-gray-700 transition-colors">
                                  <IconComponent size={20} />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                  {amenity}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 text-gray-300 border-gray-700">
                              {description}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <Card className="bg-gray-900/80 border-gray-800 overflow-hidden rounded-lg shadow-lg shadow-green-900/10">
              <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 h-2"></div>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                    Book this venue
                  </span>
                </h2>
                <div className="mb-5 bg-gray-800/50 p-4 rounded-lg">
                  <img
                    src={turfData.turfPhotos[0]}
                    alt="Turf Preview"
                    className="w-full h-24 object-cover rounded-md mb-3"
                  />
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Shield size={16} className="text-green-400" />
                    <span>Ideal for {turfData.courtSize} matches</span>
                  </div>
                </div>

                <Tabs defaultValue="booking" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-5 bg-gray-800/30 p-1">
                    <TabsTrigger
                      value="booking"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/40 data-[state=active]:to-green-800/30 data-[state=active]:text-white"
                    >
                      Book Now
                    </TabsTrigger>
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/40 data-[state=active]:to-green-800/30 data-[state=active]:text-white"
                    >
                      Venue Info
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="booking" className="space-y-4">
                    {bookingStep === "calendar" && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Calendar size={18} className="text-green-400" />
                          <h3 className="font-medium text-white">Select a date</h3>
                        </div>
                        <div className="bg-gray-800/50 p-1 rounded-lg">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            className="rounded-md border border-gray-700 bg-gray-800/80 p-3 pointer-events-auto"
                            disabled={(date: Date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              date.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {bookingStep === "slots" && date && (
                      isLoading ? (
                        <div className="py-8 flex flex-col items-center">
                          <div className="animate-spin h-8 w-8 border-t-2 border-green-500 rounded-full mb-4"></div>
                          <p className="text-gray-400">Loading available slots...</p>
                        </div>
                      ) : (
                        <BookingSlots
                          date={date}
                          availableSlots={availableSlots}
                          onSlotSelect={handleSlotSelect}
                          onBack={handleBackToCalendar}
                        />
                      )
                    )}

                    {bookingStep === "confirmation" && date && selectedSlot && (
                      <BookingConfirmation
                        date={date}
                        slot={selectedSlot}
                        duration={duration}
                        currency={"₹"}
                        onDurationChange={handleDurationChange}
                        onBack={handleBackToSlots}
                        onConfirm={handleConfirmBooking}
                        price={0}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="info">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3 flex items-center text-green-300">
                          <Clock size={16} className="mr-2" /> Hours
                        </h3>
                        <p className="text-sm text-gray-400 ml-7">
                          Open from 6:00 AM to 11:00 PM daily
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 flex items-center text-green-300">
                          <Mail size={16} className="mr-2" /> Contact
                        </h3>
                        <p className="text-sm text-gray-400 ml-7">
                          Email: {turfData.email}
                          <br />
                          Phone: {turfData.phone}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 flex items-center text-green-300">
                          Established
                        </h3>
                        <p className="text-sm text-gray-400 ml-7">
                          Since April 2025
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 flex items-center text-green-300">
                          Cancellation Policy
                        </h3>
                        <p className="text-sm text-gray-400">
                          Free cancellation up to 24 hours before your booking. After that, a 50% fee applies.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 flex items-center text-green-300">
                          Venue Rules
                        </h3>
                        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-2">
                          <li>Proper sports shoes required</li>
                          <li>No food or drinks on the playing area</li>
                          <li>Arrive 15 minutes before your slot</li>
                          <li>Equipment rentals available at extra cost</li>
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
  );
}