import { CalendarDays, Clock, Users, MapPin, Crown, X, UserCheck } from "lucide-react";
import moment from "moment";
import { ISharedBookingEntity } from "../../types/SharedTypes";

interface HostedgameCardProps {
  game: any;
  onCancel?: (gameId: string,bookingType:string) => void;
}

export default function HostedgameCard({ game, onCancel }: HostedgameCardProps) {
  console.log("HostedgameCard", game);
  const { turf } = game;

  const handleCancel = () => {
    if (onCancel && game.id) {
      onCancel(game.id,"joined");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'open':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'full':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getPlayerStatus = () => {
    const current = game.userIds.length || 0;
    const max = game.playerCount; 
    return { current, max, percentage: (current / max) * 100 };
  };

  const playerStatus = getPlayerStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Crown size={18} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Hosted game</h3>
              <p className="text-sm text-gray-600">Hosted by {game.userIds[0].name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(game.status)}`}>
              {game.status}
            </span>
            {game.status.toLowerCase() !== 'cancelled' && game.status.toLowerCase() !== 'completed' && (
              <button
                onClick={handleCancel}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Cancel game"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <CalendarDays size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {moment(game.date).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                <Clock size={14} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Time & Duration</p>
                <p className="text-sm font-medium text-gray-900">
                  {game.time} • {game.duration} hour{game.duration > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                <MapPin size={14} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Turf</p>
                <p className="text-sm font-medium text-gray-900">{turf?.name}</p>
                <p className="text-xs text-gray-500">{turf?.courtSize}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                <Users size={14} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Players</p>
                <p className="text-sm font-medium text-gray-900">
                  {playerStatus.current}/{playerStatus.max} joined
                </p>
                <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-orange-400 rounded-full transition-all"
                    style={{ width: `${Math.min(playerStatus.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total game Cost</p>
              <p className="text-lg font-semibold text-gray-900">₹{game.price}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Per Player</p>
              <p className="text-sm font-medium text-gray-700">
                ₹{Math.round(game.price / playerStatus.max)}
              </p>
            </div>
          </div>
        </div>

        {/* Slot Status */}
        {game.isSlotLocked && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-700 flex items-center gap-2">
              <UserCheck size={12} />
              Slot is locked - No more players can join
            </p>
          </div>
        )}
      </div>

      {/* Footer Section - Actions */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Created {moment(game.createdAt).format("MMM D, h:mm A")}
          </div>
          <div className="flex gap-2">
            {game.status.toLowerCase() != 'cancelled' && (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                >
                  Cancel game
                </button>
                {/* <button className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                  View Players
                </button> */}
              </>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
}