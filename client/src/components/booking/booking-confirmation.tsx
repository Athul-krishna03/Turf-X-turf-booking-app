"use client"

import { format } from "date-fns"
import { Button } from "../../components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Separator } from "../../components/ui/separator"

interface BookingConfirmationProps {
  date: Date
  slot: string
  duration: number
  price: number
  currency: string
  onDurationChange: (duration: number) => void
  onBack: () => void
  onConfirm: () => void
}

export default function BookingConfirmation({
  date,
  slot,
  duration,
  price,
  currency,
  onDurationChange,
  onBack,
  onConfirm,
}: BookingConfirmationProps) {
  // Calculate end time based on start time and duration
  const calculateEndTime = (startTime: string, durationHours: number) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const endHours = hours + durationHours
    return `${endHours}:${minutes.toString().padStart(2, "0")}`
  }

  const endTime = calculateEndTime(slot, duration)
  const totalPrice = price * duration

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Confirm your booking</h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Date:</span>
          <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time:</span>
          <span>
            {slot} - {endTime}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-sm">Duration</h4>
        <div className="flex gap-2">
          {[1, 2, 3].map((hours) => (
            <Button
              key={hours}
              variant={duration === hours ? "default" : "outline"}
              size="sm"
              className={duration === hours ? "" : "border-gray-700"}
              onClick={() => onDurationChange(hours)}
            >
              {hours} {hours === 1 ? "hour" : "hours"}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-2" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Price per hour:</span>
          <span>
            {currency}
            {price}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Duration:</span>
          <span>
            {duration} {duration === 1 ? "hour" : "hours"}
          </span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>
            {currency}
            {totalPrice}
          </span>
        </div>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-500" onClick={onConfirm}>
        Confirm Booking
      </Button>
    </div>
  )
}
