"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  CalendarDays,
  Clock,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Wallet,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { turfLogout } from "../../store/slices/turf.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "../../hooks/useToast"
import TurfSideBar from "../../components/turf/turfSideBar"
const bookingData = [
  { name: "Mon", bookings: 4 },
  { name: "Tue", bookings: 7 },
  { name: "Wed", bookings: 5 },
  { name: "Thu", bookings: 8 },
  { name: "Fri", bookings: 12 },
  { name: "Sat", bookings: 15 },
  { name: "Sun", bookings: 10 },
]

const recentBookings = [
  { id: 1, name: "Football Club A", time: "10:00 AM - 12:00 PM", date: "Today", status: "Confirmed" },
  { id: 2, name: "Corporate Event", time: "2:00 PM - 4:00 PM", date: "Today", status: "Confirmed" },
  { id: 3, name: "School Tournament", time: "9:00 AM - 1:00 PM", date: "Tomorrow", status: "Pending" },
  { id: 4, name: "Local Team Practice", time: "6:00 PM - 8:00 PM", date: "Tomorrow", status: "Confirmed" },
]

export default function TurfDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
   
  }, [])
  const handleLogout=()=>{
    dispatch(turfLogout());
    toast({
        title: "Success!",
        description: "logout successful!",
        duration: 3000,
      });
    navigate("/turf/login")
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <TurfSideBar/>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 pt-20 md:pt-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M7 17l9-9" />
                  <path d="M17 17V8" />
                  <path d="M7 8h9" />
                </svg>
                12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹24,500</div>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M7 17l9-9" />
                  <path d="M17 17V8" />
                  <path d="M7 8h9" />
                </svg>
                8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">New Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M7 17l9-9" />
                  <path d="M17 17V8" />
                  <path d="M7 8h9" />
                </svg>
                24% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Trends Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Booking Trends</CardTitle>
              <CardDescription>Number of bookings per day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={bookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest turf bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {booking.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{booking.name}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {booking.time}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        {booking.date}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Turf Information */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Turf Information</CardTitle>
              <CardDescription>Your turf details and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Turf Name:</span>
                      <span className="text-sm font-medium">Green Field Sports Arena</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Location:</span>
                      <span className="text-sm font-medium">123 Sports Lane, City</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Contact:</span>
                      <span className="text-sm font-medium">+91 98765 43210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium">contact@greenfieldsports.com</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Operating Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Weekdays:</span>
                      <span className="text-sm font-medium">6:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Weekends:</span>
                      <span className="text-sm font-medium">6:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Holidays:</span>
                      <span className="text-sm font-medium">8:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="mr-2">Edit Information</Button>
                <Button variant="outline">View Public Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
