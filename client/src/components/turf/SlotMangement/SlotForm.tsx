// SlotForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { generateSlots } from '../../../services/turf/turfServices';
import { useSelector } from 'react-redux';

interface SlotFormProps {
  setSlots: React.Dispatch<React.SetStateAction<any[]>>;
}

const SlotForm: React.FC<SlotFormProps> = ({ setSlots }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState<number>(60); // Default 60 minutes
  const turf = useSelector((state:any)=>state?.turf.turf);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleGenerateSlots = async () => {
    try {
      const response = await generateSlots(
        turf.turfId,
        selectedDate,
        startTime,
        endTime,
        duration
    );
      console.log(response)
      setSlots(response.slots); // Set the slots to parent component
    } catch (error) {
      console.error('Error generating slots:', error);
      alert('Failed to generate slots. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Generate Slots</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Start Time"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="End Time"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Duration (minutes)"
          min={15}
        />
      </div>

      <button
        onClick={handleGenerateSlots}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Generate Slots
      </button>
    </div>
  );
};

export default SlotForm;
