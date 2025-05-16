"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { HostedGame } from "./HostedGamesList";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { PaymentModal } from "../booking/payment-modal";

interface HostedGameDialogProps {
    game: HostedGame | null;
    open: boolean;
    onClose: () => void;
}

const HostedGameDialog = ({
    game,
    open,
    onClose,
}: HostedGameDialogProps) => {
    if (!game) return null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const price = game.amountPerPlayer
    const navigate = useNavigate()
    const onJoin = ()=>{
        setIsModalOpen(true)
    }
    const handlePaymentSuccess = () => {
        setIsModalOpen(false);
        toast.success(
        <div className="flex flex-col">
            <span className="font-semibold">Booking Confirmed!</span>
            <span className="text-sm">
            {format(game.date!, "PPP")} at {game.time} for {game.duration} hour(s)
            </span>
        </div>);
        navigate("/user/hostedGames")

    console.log("game data",game);
    
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] sm:max-h-screen bg-black text-green-100 border border-green-700">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-green-400">
                        {game.title}
                    </DialogTitle>
                    <DialogDescription>
                        <Badge
                            className={`mt-2 text-black ${
                                game.status === "Pending"
                                    ? "bg-green-500"
                                    : game.status === "Booked"
                                    ? "bg-yellow-500"
                                    : "bg-gray-600"
                            }`}
                        >
                            {game.status === "Pending"
                                ? "Open"
                                : game.status === "Booked"
                                ? "Full"
                                : "Completed"}
                        </Badge>
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-green-400 mb-1">
                                Sport Type
                            </h4>
                            <p className="text-green-100">{game.sportType}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-green-400 mb-1">Venue</h4>
                            <p className="text-green-100">
                                {game.venueName}, {game.location}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-green-400 mb-1">Date</h4>
                                <p className="text-green-100">{game.date}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-green-400 mb-1">Time</h4>
                                <p className="text-green-100">{game.time}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-green-400 mb-1">
                                    Players
                                </h4>
                                <p className="text-green-100">
                                    {game.playersJoined}/{game.playerCount} joined
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-green-400 mb-1">
                                    Amount
                                </h4>
                                <p className="text-green-200 font-semibold">
                                    ₹{game.amountPerPlayer} per player
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-green-400 mb-1">Host</h4>
                            <p className="text-green-100">{game.hostName}</p>
                        </div>

                        {game.description && (
                            <div>
                                <h4 className="text-sm font-medium text-green-400 mb-1">
                                    Description
                                </h4>
                                <p className="text-green-100 text-sm">{game.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            
                            className="border-green-500 text-green-300 hover:bg-green-900"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-black"
                            onClick={() => onJoin()}
                            disabled={
                                game.status !== "Pending" ||
                                game.playersJoined >= game.playerCount
                            }
                        >
                            {game.status === "Pending" ? "Join Game" : "Game Unavailable"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
            {isModalOpen && (
                <PaymentModal
                    slot={game.time}
                    date={game.date}
                    duration={game.duration}
                    currency={""}
                    totalPrice={price}
                    onClose={() => setIsModalOpen(false)}
                    onPaymentSuccess={handlePaymentSuccess}
                    paymentType="Join"
                    />
                )}
        </Dialog>
        

    );
};

export default HostedGameDialog;
