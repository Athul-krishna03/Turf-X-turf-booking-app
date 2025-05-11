import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSlots } from '../../../services/turf/turfServices';
import SlotForm from './SlotForm';
import SlotList from './SlotList';

import TurfSideBar from '../turfSideBar';

const SlotManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const turf = useSelector((state: any) => state?.turf?.turf);
  const queryClient = useQueryClient();

  const { data: slots, isLoading, refetch } = useQuery({
    queryKey: ['slots', turf?.turfId, selectedDate],
    queryFn: () => fetchSlots(turf.turfId, selectedDate),
    enabled: !!turf?.turfId && !!selectedDate,
    select: (res) => res.data, // pick only data array
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10">
        <TurfSideBar />
      </div>

      {/* Main content */}
      <div className="ml-64 p-6 w-full overflow-auto">
        <SlotForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {isLoading ? (
          <div className="text-center mt-6">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading slots...</p>
          </div>
        ) : !slots || slots.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">No slots found for this date.</div>
        ) : (
          <SlotList
            slots={slots}
            refetchSlots={refetch} // Pass the refetch function to SlotList
          />
        )}
      </div>
    </div>
  );
};

export default SlotManager;
