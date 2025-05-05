import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { generateSlots } from '../../../services/turf/turfServices';

interface SlotFormProps {
  setSlots: React.Dispatch<React.SetStateAction<any[]>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const SlotForm: React.FC<SlotFormProps> = ({ setSlots, selectedDate, setSelectedDate }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState<number>(60); // Default 60 minutes
  const [price, setPrice] = useState<number>(0);

  const turf = useSelector((state: any) => state?.turf.turf);

  const handleGenerateSlots = async () => {
    try {
      const response = await generateSlots(
        turf.turfId,
        selectedDate,
        startTime,
        endTime,
        duration,
        price
      );
      console.log(response);
      setSlots(response.slots); // Set the slots to parent component
    } catch (error) {
      console.error('Error generating slots:', error);
      alert('Failed to generate slots. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-[#31304D] mb-4">Generate Slots</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            min={15}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Slot Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter price"
            min={0}
          />
        </div>
      </div>

      <button
        onClick={handleGenerateSlots}
        className="bg-[#161A30] hover:bg-[#0f1324] text-white px-6 py-2 rounded-lg font-semibold transition-all"
      >
        Generate Slots
      </button>
    </div>
  );
};

export default SlotForm;
