import { Slot } from "../../types/SlotsType";
import { Button } from "../ui/button"



interface BookingSlotsProps {
  date: Date;
  availableSlots: Slot[];
  onSlotSelect: (slot:Slot) => void;
  onBack: () => void;
}

export default function BookingSlots({ date, availableSlots, onSlotSelect, onBack }: BookingSlotsProps) {
  const isEmpty = availableSlots.length === 0;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-3 text-gray-300">Select a time slot for {date.toDateString()}</h3>

      {isEmpty ? (
        <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="mb-4 text-gray-400">No available slots for the selected date.</p>
          <Button variant="ghost" onClick={onBack} className="hover:bg-gray-700 transition-colors">
            ← Back to calendar
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            {availableSlots.map((slot: Slot) => (
              <Button 
              key={slot.startTime}
              onClick={() => !slot.isBooked && onSlotSelect(slot)}
              disabled={slot.isBooked}
              className={`py-6 border text-white transition-all duration-200
                ${slot.isBooked 
                  ? 'bg-red-900/30 border-red-700 cursor-not-allowed opacity-60' 
                  : 'hover:bg-green-900/30 hover:border-green-700 border-gray-700'
                }`}
            >
              {slot.startTime}
            </Button>
            
            ))}
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 hover:bg-gray-800 transition-colors text-green-500" 
            onClick={onBack}
          >
            ← Back to calendar
          </Button>
        </>
      )}
    </div>
  )
}
