"use client"

import { format } from "date-fns"
import { Button } from "../../components/ui/button"
import { ChevronLeft } from "lucide-react"

interface BookingSlotsProps {
  date: Date
  availableSlots: string[]
  onSlotSelect: (slot: string) => void
  onBack: () => void
}

export default function BookingSlots({ date, availableSlots, onSlotSelect, onBack }: BookingSlotsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Available slots for {format(date, "EEEE, MMMM d")}</h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
      </div>

      {availableSlots.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No slots available for this date. Please select another date.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <Button
              key={slot}
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
              onClick={() => onSlotSelect(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
