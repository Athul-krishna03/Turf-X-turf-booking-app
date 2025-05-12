import { format } from "date-fns";
import { useState } from "react";
import PaymentWrapper from "./Payment-form";
import { Button } from "../ui/button";
import { Slot } from "../../types/SlotsType";
import * as Dialog from "@radix-ui/react-dialog";
import { Clock, Calendar, CreditCard, CheckCircle } from "lucide-react";


export const PaymentModal = ({
  date,
  slot,
  duration,
  currency,
  totalPrice,
  onClose,
  onPaymentSuccess,
  paymentType
}: {
  date: Date;
  slot: Slot;
  duration: number;
  currency: string;
  totalPrice: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
  paymentType:"single" | "full" | "shared"
}) => {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">("pending");

  const handlePaymentSuccess = () => {
    setPaymentStatus("success");
    onPaymentSuccess();
  };

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto text-white">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Complete Your Booking
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-400 mb-4">
            Enter your payment details to confirm your turf booking.
          </Dialog.Description>
          {paymentStatus === "pending" ? (
            <>
              <div className="space-y-4">
                <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar size={18} className="text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="font-medium">{format(date, "PPP")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={18} className="text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Time Slot</p>
                      <p className="font-medium">{slot.startTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center h-[18px] w-[18px] justify-center text-green-400">
                      <span className="text-xs font-bold">hr</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-medium">{duration} hour{duration > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard size={18} className="text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Total Price</p>
                      <p className="font-medium text-lg">
                        {currency} {totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Payment Method</p>
                  <PaymentWrapper
                    slotId={slot._id}
                    price={totalPrice}
                    date={slot.date}
                    durarion={duration}
                    onSuccess={handlePaymentSuccess}
                    onError={onClose}
                    paymentType={paymentType}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={onClose}
                  className="flex-1 hover:bg-gray-800 hover:border-gray-700 transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Dialog.Title className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle size={24} className="text-green-500 mr-2" />
                Payment Successful
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-400 mb-4">
                Your booking has been confirmed successfully.
              </Dialog.Description>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Your booking has been confirmed! You'll receive a confirmation email soon.
                </p>
                <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">Booking Details</p>
                  <p className="font-medium">
                    {format(date, "PPP")} at {slot.startTime} for {duration} hour{duration > 1 ? "s" : ""}
                  </p>
                  <p className="font-medium text-lg mt-2">
                    Paid: {currency} {totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="w-full mt-6 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 transition-all duration-300"
              >
                Close
              </Button>
            </>
          )}
        </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};