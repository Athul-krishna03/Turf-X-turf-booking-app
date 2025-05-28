// SlotList.tsx
import React, { useState } from 'react';
import { updateSlotStatus } from '../../../services/turf/turfServices';

export interface Slot {
  _id?: string;
  startTime: string;
  endTime:string;
  price: number;
  isBooked: boolean;
}

interface SlotListProps {
  slots: Slot[];
  refetchSlots: () => void;
}

const SlotList: React.FC<SlotListProps> = ({ slots, refetchSlots }) => {
  const [manualTime, setManualTime] = useState('');

  const toggleBlock = async (slot: Slot) => {
    try {
      await updateSlotStatus(slot._id!);
      await refetchSlots(); // trigger re-fetch
    } catch (error) {
      console.error('Error toggling block:', error);
      alert('Failed to update slot.');
    }
  };

  // const addManualSlot = async () => {
  //   if (!manualTime) return alert('Please enter a time.');

  //   try {
  //     const response = await axios.post('/api/slots/manual-add', {
  //       time: manualTime,
  //     });

  //     setSlots((prevSlots) => [...prevSlots, response.data.newSlot]);
  //     setManualTime('');
  //   } catch (error) {
  //     console.error('Error adding slot manually:', error);
  //     alert('Failed to add slot.');
  //   }
  // };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
  <h2 className="text-xl font-semibold text-[#31304D] mb-4">Manage Slots</h2>

  {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
    <input
      type="time"
      value={manualTime}
      onChange={(e) => setManualTime(e.target.value)}
      className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Add Manual Slot"
    />
    <button
      onClick={addManualSlot}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
    >
      Add Slot
    </button>
  </div> */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {slots.map((slot) => (
      <div
        key={slot._id}
        className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-[#F0ECE5]"
      >
        <div>
        <span className="font-semibold">
          {slot.startTime}-{slot.endTime} <br />
          <span className="text-sm text-gray-600">₹{slot.price}</span>
        </span>

          <div className="text-sm mt-1">
            <span
              className={`inline-block px-2 py-1 rounded-full text-white ${
                slot.isBooked ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {slot.isBooked ? 'Booked' : slot.isBooked ? 'Blocked' : 'Available'}

            </span>
          </div>
        </div>

        {!slot.isBooked && (
          <button
            onClick={() => toggleBlock(slot)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              slot.isBooked
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {slot.isBooked ? 'Unblock' : 'Block'}
          </button>
        )}

      </div>
    ))}
  </div>
</div>

  );
};

export default SlotList;


