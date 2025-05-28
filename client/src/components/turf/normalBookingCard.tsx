import { CalendarDays, Clock, User, MapPin, Phone } from "lucide-react";
import { Booking } from "../../types/Type";
import moment from "moment";

interface NormalBookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: string,bookingType:string) => void;
}

export default function NormalBookingCard({ booking, onCancel }: NormalBookingCardProps) {
  const { _doc, turf } = booking;

  const handleCancel = () => {
    if (onCancel && _doc._id) {
      onCancel(_doc._id,"single");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'booked':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User size={18} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{booking.userName}</h3>
              <p className="text-sm text-gray-600">Customer Booking</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(_doc.status)}`}>
              {_doc.status}
            </span>
            {_doc.status.toLowerCase() !== 'cancelled' && (
              <button
                onClick={handleCancel}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Cancel Booking"
              >
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
                  {moment(_doc.date).format("MMMM D, YYYY")}
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
                  {_doc.time} • {_doc.duration} hour{_doc.duration > 1 ? "s" : ""}
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
              </div>
            </div>

            {/* Additional info can go here */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                <Phone size={14} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Booking ID</p>
                <p className="text-sm font-medium text-gray-900">#{_doc.bookingId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Actions */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Booked on {moment(_doc.createdAt || new Date()).format("MMM D, h:mm A")}
          </div>
          <div className="flex gap-2">
            {_doc.status.toLowerCase() === 'booked' && (
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
              >
                Cancel Booking
              </button>
            )}
            {/* <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              Contact Customer
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}