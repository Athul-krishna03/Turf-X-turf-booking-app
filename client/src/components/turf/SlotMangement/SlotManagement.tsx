// SlotManager.tsx
import React, { useState } from 'react';
import SlotForm from './SlotForm';
import SlotList from './SlotList';

const SlotManager: React.FC = () => {
  const [slots, setSlots] = useState<any[]>([]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Slot Manager</h1>
      <SlotForm setSlots={setSlots} />
      <SlotList slots={slots} setSlots={setSlots} />
    </div>
  );
};

export default SlotManager;
