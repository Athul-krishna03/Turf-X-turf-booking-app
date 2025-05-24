import { CalendarDays, Clock, User } from "lucide-react";
import { Booking } from "../../types/Type";
import moment from "moment";

export default function NormalBookingCard({ booking }: { booking: Booking }) {
const { _doc, turf } = booking;

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white border hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User size={16} className="text-green-600" />
          <span className="font-medium">{booking.userName}</span>
        </div>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          {_doc.status}
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-gray-500" />
          <span>{moment(_doc.date).format("MMM D, YYYY")}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span>
            {_doc.time} for {_doc.duration} hr{_doc.duration > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Turf:</span>
          <span>{turf?.name}</span>
        </div>
      </div>
    </div>
  );
}
