"use client"

import { format } from "date-fns"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { MapPin, Calendar, Clock, ChevronRight, Check, XCircle, Award } from "lucide-react"

export interface BookingCardProps {
  booking: {
    id?: string
    turfId: string
    turfName: string
    turfImage: string[]
    location: {
      city: string,
      state: string
    }
    date: string
    startTime?: string
    endTime?: string
    duration: number
    price: number
    currency: string
    status: string
    sport?: string
  }
  onCancel: () => void
  showActions: boolean
  type: string
}

export default function BookingCard({ booking, onCancel, showActions, type }: BookingCardProps) {


  console.log("data in booking card",booking);
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "Booked":
        return (
          <Badge className="bg-emerald-600 hover:bg-emerald-700 font-medium flex items-center gap-1">
            <Check size={14} className="opacity-90" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-600 hover:bg-amber-700 font-medium flex items-center gap-1">
            <Clock size={14} className="opacity-90" />
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700 font-medium flex items-center gap-1">
            <Award size={14} className="opacity-90" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-rose-600 hover:bg-rose-700 font-medium flex items-center gap-1">
            <XCircle size={14} className="opacity-90" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return price % 1 === 0 ? price.toString() : price.toFixed(2)
  }

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden rounded-xl transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-gray-900/20">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Turf Image */}
          {booking.turfImage?.[0] && (
            <div className="w-full md:w-[250px] h-[180px] md:h-auto">
              <img
                src={booking.turfImage[0]}
                alt={`Image of ${booking.turfName}`}
                className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
              />
            </div>
          )}

          {/* Booking Details */}
          <div className="flex-1 p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{booking.turfName}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span>{booking.location?.city}, {booking.location?.state}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar size={16} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">Date</p>
                      <p className="text-white">{format(new Date(booking.date), "EEEE, MMMM d, yyyy")}</p>
                    </div>
                  </div>
                  {booking.startTime && (
                    <div className="flex items-start">
                      <Clock size={16} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">Time</p>
                        <p className="text-white">
                          {booking.startTime}
                          <span className="text-gray-400 ml-1">
                            ({booking.duration} {booking.duration === 1 ? "hour" : "hours"})
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {type !== "joined" && (
                <div>
                  <div className="md:text-right md:pl-4 md:min-w-[150px]">
                    <div className="text-2xl font-bold text-white">
                      {booking.currency}{formatPrice(booking.price)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {booking.currency}{formatPrice(booking.price / booking.duration)} × {booking.duration} {booking.duration === 1 ? "hour" : "hours"}
                    </div>
                  </div>

                  {showActions && booking.status.toLowerCase() !== "cancelled" && (
                    <div className="flex flex-col gap-2 mt-5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-rose-500 hover:bg-rose-950/30 hover:border-rose-800 hover:text-rose-400 transition-colors"
                        onClick={onCancel}
                        aria-label="Cancel Booking"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}

                  {!showActions && booking.status.toLowerCase() === "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-5 border-gray-700 hover:bg-gray-800 hover:text-white transition-colors"
                      aria-label="Book Again"
                    >
                      Book Again
                    </Button>
                  )}
                </div>
              )}
            </div>
            {showActions && booking.status.toLowerCase() === "pending" && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  asChild
                >
                  <a href={`/user/joinedGameDetails/${booking.id}`} aria-label="View Turf Details">
                    View Turf Details <ChevronRight size={16} className="ml-1" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
