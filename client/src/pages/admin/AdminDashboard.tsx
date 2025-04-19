import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  Users, 
  PieChart, 
  BarChart3, 
  CalendarDays, 
  LogOut, 
  Settings, 
  Home,
  Menu,
  X
} from "lucide-react";

// Sample data for charts
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 3490 },
  { name: "Aug", revenue: 4200 },
  { name: "Sep", revenue: 5600 },
  { name: "Oct", revenue: 4900 },
  { name: "Nov", revenue: 6100 },
  { name: "Dec", revenue: 7200 },
];

const turfBookingsData = [
  { name: "Turf A", bookings: 140 },
  { name: "Turf B", bookings: 120 },
  { name: "Turf C", bookings: 180 },
  { name: "Turf D", bookings: 90 },
  { name: "Turf E", bookings: 160 },
];

const customerData = [
  { name: "Jan", customers: 40 },
  { name: "Feb", customers: 35 },
  { name: "Mar", customers: 55 },
  { name: "Apr", customers: 48 },
  { name: "May", customers: 62 },
  { name: "Jun", customers: 70 },
];


const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-black text-white">
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-green-500 mr-2">•</span> Admin Portal
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4">
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeMenu === "dashboard" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
              onClick={() => setActiveMenu("dashboard")}
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeMenu === "customers" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
              onClick={() => setActiveMenu("customers")}
            >
              <Users className="h-5 w-5 mr-3" />
              Customers
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeMenu === "turfs" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
              onClick={() => setActiveMenu("turfs")}
            >
              <PieChart className="h-5 w-5 mr-3" />
              Turfs
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeMenu === "bookings" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
              onClick={() => setActiveMenu("bookings")}
            >
              <CalendarDays className="h-5 w-5 mr-3" />
              Bookings
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeMenu === "analytics" ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
              onClick={() => setActiveMenu("analytics")}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Analytics
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </a>
          <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10 md:pt-0 pt-16">
          <div className="px-4 py-4 md:px-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeMenu === "dashboard" && "Dashboard Overview"}
              {activeMenu === "customers" && "Customer Management"}
              {activeMenu === "turfs" && "Turf Management"}
              {activeMenu === "bookings" && "Booking Management"}
              {activeMenu === "analytics" && "Analytics & Reports"}
            </h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {activeMenu === "dashboard" && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Revenue</p>
                      <h3 className="text-2xl font-bold">₹45,600</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-green-600 text-sm mt-2">+12.5% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Bookings</p>
                      <h3 className="text-2xl font-bold">690</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <CalendarDays className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm mt-2">+8.2% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Customers</p>
                      <h3 className="text-2xl font-bold">310</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-purple-600 text-sm mt-2">+5.3% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Active Turfs</p>
                      <h3 className="text-2xl font-bold">5</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <PieChart className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-orange-600 text-sm mt-2">+1 from last month</p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                </div>
                <div className="p-5 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Two Charts Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Turf Popularity */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Turf Popularity</h3>
                  </div>
                  <div className="p-5 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={turfBookingsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="bookings" fill="#8884d8" name="Number of Bookings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Customer Growth */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Customer Growth</h3>
                  </div>
                  <div className="p-5 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={customerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="customers" stroke="#10b981" activeDot={{ r: 8 }} name="New Customers" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMenu === "customers" && (
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
              <p>Customer listing and management interface would appear here.</p>
            </div>
          )}

          {activeMenu === "turfs" && (
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-semibold mb-4">Turf Management</h2>
              <p>Turf listing and management interface would appear here.</p>
            </div>
          )}

          {activeMenu === "bookings" && (
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
              <p>Booking calendar and management interface would appear here.</p>
            </div>
          )}

          {activeMenu === "analytics" && (
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-semibold mb-4">Analytics & Reports</h2>
              <p>Detailed analytics and reporting tools would appear here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;