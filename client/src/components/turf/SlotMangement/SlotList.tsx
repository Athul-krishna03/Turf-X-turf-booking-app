// SlotList.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Slot {
  _id?: string;
  startTime: string;
  endTime:string;
  
  isBooked: boolean;
}

interface SlotListProps {
  slots: Slot[];
  setSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}

const SlotList: React.FC<SlotListProps> = ({ slots, setSlots }) => {
  const [manualTime, setManualTime] = useState('');

  const toggleBlock = async (slot: Slot) => {
    try {
      const response = await axios.patch(`/api/slots/${slot._id}/toggle-block`);
      const updatedSlot = response.data.updatedSlot;

      setSlots((prevSlots) =>
        prevSlots.map((s) => (s._id === updatedSlot._id ? updatedSlot : s))
      );
    } catch (error) {
      console.error('Error toggling block:', error);
      alert('Failed to update slot.');
    }
  };

  const addManualSlot = async () => {
    if (!manualTime) return alert('Please enter a time.');

    try {
      const response = await axios.post('/api/slots/manual-add', {
        time: manualTime,
      });

      setSlots((prevSlots) => [...prevSlots, response.data.newSlot]);
      setManualTime('');
    } catch (error) {
      console.error('Error adding slot manually:', error);
      alert('Failed to add slot.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Slots</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="time"
          value={manualTime}
          onChange={(e) => setManualTime(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Add Manual Slot"
        />
        <button
          onClick={addManualSlot}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Slot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className={`border p-4 rounded flex justify-between items-center ${
              slot.isBooked ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <span className="font-semibold">{slot.startTime}-{slot.endTime}</span>
            <button
              onClick={() => toggleBlock(slot)}
              className={`px-3 py-1 rounded ${
                slot.isBooked
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white text-sm`}
            >
              {slot.isBooked ? 'Unblock' : 'Block'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotList;
