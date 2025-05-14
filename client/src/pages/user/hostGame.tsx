import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import { getSlotData } from "../../services/user/userServices"
import { PaymentModal } from "../../components/booking/payment-modal"
import { Slot } from "../../types/SlotsType"
import { toast } from "sonner"



const HostGamePage: React.FC = () => {
  const { slotId } = useParams<{ slotId: string }>()
  const [slot, setSlot] = useState<Slot | null>()
  const [paymentMode, setPaymentMode] = useState<"full" | "host">("full")
  const [playerCount, setPlayerCount] = useState<number>(2)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharedModal,setSharedModalOpen]= useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const response = await getSlotData(slotId as string);
        setSlot(response)
      } catch (error) {
        console.error("Error fetching slot:", error)
      }
    }

    fetchSlot()
  }, [slotId])

  const handleSumbit = async ()=>{
    if(paymentMode=="full"){
      setIsModalOpen(true)
    }else{
      setSharedModalOpen(true)
    }
  }
  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    toast.success(
      <div className="flex flex-col">
        <span className="font-semibold">Booking Confirmed!</span>
        <span className="text-sm">
          {format(slot?.date!, "PPP")} at {slot?.startTime} for {slot?.duration} hour(s)
        </span>
      </div>
    );
    navigate("/")
    
  };
if(!slot) return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-700 rounded mb-4"></div>
          <div className="text-gray-400">Loading slot details...</div>
        </div>
      </div>
  const maxPlayers = 10 // You can set this based on your business logic or slot data
  const perPlayerPrice = Math.ceil(Number(slot.price) / playerCount)

  return (
    <div className="bg-black min-h-screen">
    <div className="max-w-3xl mx-auto p-6 text-white space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Host a Game</h2>

      {/* Slot Info */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <div className="space-y-1">
          <p className="text-gray-400 text-sm">Date</p>
          <p className="font-medium">{format(new Date(slot.date), "PPP")}</p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-400 text-sm">Time</p>
          <p className="font-medium">{slot.startTime}</p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-400 text-sm">Duration</p>
          <p className="font-medium">{slot.duration/60} hour(s)</p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-400 text-sm">Total Price</p>
          <p className="font-semibold text-lg text-green-400">₹{slot.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <p className="text-sm text-gray-300 mb-2 font-semibold">Choose Payment Option:</p>
        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between cursor-pointer bg-gray-900 p-3 rounded-md border border-gray-700 hover:border-green-500">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="full"
                checked={paymentMode === "full"}
                onChange={() => setPaymentMode("full")}
                className="form-radio accent-green-500"
              />
              <span className="text-white">Book With Full Payment</span>
            </div>
            <span className="text-green-400 font-semibold">₹{slot.price.toLocaleString()}</span>
          </label>

          <label className="flex flex-col space-y-2 bg-gray-900 p-3 rounded-md border border-gray-700 hover:border-green-500">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="host"
                checked={paymentMode === "host"}
                onChange={() => setPaymentMode("host")}
                className="form-radio accent-green-500"
              />
              <span className="text-white">Pay the share</span>
            </div>

            {paymentMode === "host" && (
              <div className="mt-2 space-y-2">
                <label className="text-sm text-gray-300">Number of players expected:</label>
                <select
                  value={playerCount}
                  onChange={(e) => setPlayerCount(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                >
                  {[...Array(maxPlayers)].map((_, i) => (
                    <option key={i + 2} value={i + 2}>
                      {i + 2} players
                    </option>
                  ))}
                </select>
                <div className="text-sm text-green-400 font-medium">
                  Each player pays: ₹{perPlayerPrice.toLocaleString()}
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Host Policy */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-3">
        <h4 className="font-medium">Host Policy</h4>
        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
          <li>At least <strong>12 hours</strong> prior to the game, the slot must be full or all payments will be refunded.</li>
          <li>Players can join using an invite link until the slot is full.</li>
          <li>If the slot isn’t filled, the host is not charged.</li>
        </ul>
      </div> 

      {/* Action Button */}
      <div className="text-center">
        <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold" onClick={handleSumbit}>
          {paymentMode === "full" ? "Proceed to Full Payment" : "Continue to Host Setup"}
        </button>
      </div>
    </div>
    {isModalOpen && (
            <PaymentModal
              date={new Date(slot.date)}
              slot={slot}
              duration={slot?.duration/60}
              currency={"₹"}
              totalPrice={Number(slot.price)}
              onClose={() => setIsModalOpen(false)}
              onPaymentSuccess={handlePaymentSuccess}
              paymentType="full"
            />
    )}
    {
      sharedModal &&  (
        <PaymentModal
        date={new Date(slot.date)}
        slot={slot}
        duration={slot?.duration/60}
        currency={"₹"}
        totalPrice={perPlayerPrice}
        onClose={() => setSharedModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        paymentType="shared"
        playerCount={playerCount}
        />
      )
    }
    </div>
  )
}

export default HostGamePage
