import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchSlots } from '../../../services/turf/turfServices';
import SlotForm from './SlotForm';
import SlotList from './SlotList';
import { Slot } from './SlotList';
import TurfSideBar from '../turfSideBar';

const SlotManager: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const turf = useSelector((state: any) => state?.turf?.turf);
  console.log(turf);
  

  useEffect(() => {
    const loadSlots = async () => {
      console.log("entered");
      
      if (!turf?.turfId || !selectedDate) return;

      try {
        setLoading(true);
        const response = await fetchSlots(turf.turfId, selectedDate);
        setSlots(response.data || []);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadSlots();
  }, [turf?.turfId, selectedDate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <TurfSideBar/>
    <div className="p-6">
      <SlotForm
        setSlots={setSlots}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {loading ? (
        <div className="text-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading slots...</p>
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center text-gray-500 mt-6">No slots found for this date.</div>
      ) : (
        <SlotList slots={slots} setSlots={setSlots} />

      )}
    </div>
    </div>
  );
};

export default SlotManager;
