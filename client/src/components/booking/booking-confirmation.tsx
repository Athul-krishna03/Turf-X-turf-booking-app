import { useState } from "react";
import { format } from "date-fns";
import { Clock, Calendar, CreditCard} from "lucide-react";
import { Slot } from "../../types/SlotsType";
import { Button } from "../ui/button";
import { PaymentModal } from "./payment-modal";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";


type BookingConfirmationProps = {
  date: Date;
  slot: Slot;
  duration: number;
  price: number;
  currency: string;
  onDurationChange: (newDuration: number) => void;
  onBack: () => void;
  onConfirm: () => void;
};

export default function BookingConfirmation({
  date,
  slot,
  duration,
  currency,
  onDurationChange,
  onBack,
  onConfirm,
}: BookingConfirmationProps) {
  const totalPrice = Number(slot.price) * duration;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption,setSelectedOption] = useState<"book" | "host">("book");
  const navigate = useNavigate()

  const handleConfirmClick = () => {
    if(selectedOption == "book"){
        setIsModalOpen(true);
    }else{
      navigate(`/user/hostGame/${slot._id}`)
    }
    
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="font-medium text-lg text-white">Confirm your booking</h3>
        <p className="text-sm text-gray-400">Please review your booking details below</p>
      </div>

      <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700 space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-gray-700">
          <Calendar size={18} className="text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Date</p>
            <p className="font-medium text-white">{format(date, "PPP")}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 pb-3 border-b border-gray-700">
          <Clock size={18} className="text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Time Slot</p>
            <p className="font-medium text-white">{slot.startTime}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 pb-3 border-b border-gray-700">
          <div className="flex items-center h-[18px] w-[18px] justify-center text-green-400">
            <span className="text-xs font-bold">hr</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400">Duration</p>
            <div className="flex items-center space-x-2 mt-1">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 border-gray-700 hover:bg-gray-800"
                onClick={() => duration > 1 && onDurationChange(duration - 1)}
                disabled={duration <= 1}
              >
                -
              </Button>
              <span className="font-medium text-white">{duration} hour{duration > 1 ? "s" : ""}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 border-gray-700 hover:bg-gray-800"
                onClick={() => onDurationChange(duration + 1)}
                disabled={duration >= 3}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <CreditCard size={18} className="text-green-400" />
          <div className="flex-1">
            <p className="text-sm text-gray-400">Total price</p>
            <p className="font-medium text-lg text-white">
              {currency} {totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700 space-y-4">
      <div className="flex space-x-14">
        <button
          type="button"
          onClick={() => setSelectedOption("book")}
          className={cn(
            "px-4 py-2 rounded border transition-all",
            selectedOption === "book"
              ? "bg-green-500 text-white border-green-600"
              : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
          )}
        >
          Book the slot
        </button>
        <button
          type="button"
          onClick={() => setSelectedOption("host")}
          className={cn(
            "px-4 py-2 rounded border transition-all",
            selectedOption === "host"
              ? "bg-green-500 text-white border-green-600"
              : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
          )}
        >
        Host a Game
        </button>
      </div>

      <p className="text-sm text-gray-400">
        Selected: <strong>{selectedOption === "book" ? "Book the whole slot" : "Host a game"}</strong>
      </p>
    </div>

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 hover:bg-gray-800 hover:border-gray-700 transition-colors"
        >
          Back
        </Button>
        <Button
          onClick={handleConfirmClick}
          className="flex-1 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 transition-all duration-300"
        >
          Confirm Booking
        </Button>
      </div>

      {isModalOpen && (
        <PaymentModal
          date={date}
          slot={slot}
          duration={duration}
          currency={currency}
          totalPrice={totalPrice}
          onClose={() => setIsModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          paymentType="single"
        />
      )}
    </div>
  );
}