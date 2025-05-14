"use client"

import type React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useQueryClient } from "@tanstack/react-query"
import { generateSlots,generateSlotsDateRange} from "../../../services/turf/turfServices"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Calendar } from "lucide-react"
import { toast } from "sonner"

interface SlotFormProps {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

const SlotForm: React.FC<SlotFormProps> = ({ selectedDate, setSelectedDate }) => {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [duration, setDuration] = useState<number>(60)
  const [price, setPrice] = useState<number>(0)

  // New state for date range
  const [endDate, setEndDate] = useState<string>(selectedDate)
  const [generationMode, setGenerationMode] = useState<"single" | "range">("single")

  const turf = useSelector((state: any) => state?.turf?.turf)
  const queryClient = useQueryClient()

  const handleGenerateSlots = async () => {
    try {
      if (generationMode === "single") {
        // Generate slots for a single day (existing functionality)
        await generateSlots(turf.turfId, selectedDate, startTime, endTime, duration, price)

        // Refetch slots for the selected date
        queryClient.invalidateQueries({
          queryKey: ["slots", turf.turfId, selectedDate],
        })
      } else {
        // Generate slots for a date range
        await generateSlotsDateRange(
          turf.turfId,
          selectedDate,
          endDate, 
          startTime,
          endTime,
          duration,
          price,
        )
        queryClient.invalidateQueries({
          queryKey: ["slots", turf.turfId, selectedDate],
        })
      }
    } catch (error) {
      console.error("Error generating slots:", error)
      toast.error("Failed to generate slots. Please try again.")
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-[#31304D] mb-4">Generate Slots</h2>

      <Tabs
        defaultValue="single"
        className="mb-6"
        onValueChange={(value) => setGenerationMode(value as "single" | "range")}
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          <TabsTrigger value="single" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Single Day</span>
          </TabsTrigger>
          <TabsTrigger value="range" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
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
        </TabsContent>

        <TabsContent value="range">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={selectedDate} // Prevent selecting end date before start date
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
        </TabsContent>
      </Tabs>

      <button
        onClick={handleGenerateSlots}
        className="bg-[#161A30] hover:bg-[#0f1324] text-white px-6 py-2 rounded-lg font-semibold transition-all"
        disabled={!startTime || !endTime || duration < 15 || price < 0}
      >
        {generationMode === "single" ? "Generate Slots" : "Generate Slots for Date Range"}
      </button>
    </div>
  )
}

export default SlotForm
