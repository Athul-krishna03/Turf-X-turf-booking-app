import { useState } from 'react';
import { Search, Menu, Home, Calendar, Star, Settings, User, MessageSquare, Bell, MapPin, ChevronRight, Clock, Heart } from 'lucide-react';

export default function TurfXDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const userData= localStorage.getItem("persist:session");
  
  
  const popularTurfs = [
    {
      id: 1,
      name: "GREENWAY ARENA",
      location: "Koramangala",
      distance: "1.3 km",
      rating: 4.8,
      reviews: 245,
      image: "/turf.jpg"
    },
    {
      id: 2,
      name: "STAMFORD TURF",
      location: "Indiranagar",
      distance: "2.5 km",
      rating: 4.7,
      reviews: 178,
      image: "/turf.jpg"
    },
    {
      id: 3,
      name: "SKYFIELD SPORTS",
      location: "HSR Layout",
      distance: "3.2 km",
      rating: 4.9,
      reviews: 320,
      image: "/turf.jpg"
    },
    {
      id: 4,
      name: "MEADOW GROUNDS",
      location: "Whitefield",
      distance: "4.8 km",
      rating: 4.6,
      reviews: 156,
      image: "/turf.jpg"
    }
  ];

  const sportsCategories = [
    {
      id: 1,
      name: "Football",
      color: "bg-amber-100",
      image: "\vecteezy_ai-generated-soccer-match-on-the-field_42054042.jpg"
    },
    {
      id: 2,
      name: "Badminton",
      color: "bg-pink-100",
      image: "/turf.jpg"
    },
    {
      id: 3,
      name: "Cricket",
      color: "bg-green-100",
      image: "/turf.jpg"
    }
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-gray-900 flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center">
          <img src="/api/placeholder/32/32" alt="Turf-X Logo" className="h-8 w-8" />
          <span className="hidden md:block ml-3 font-bold text-green-500">Turf-X</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 mt-6">
          <ul>
            {[
              { id: 'home', icon: <Home size={20} />, label: 'Home' },
              { id: 'calendar', icon: <Calendar size={20} />, label: 'Bookings' },
              { id: 'favorites', icon: <Star size={20} />, label: 'Favorites' },
              { id: 'messages', icon: <MessageSquare size={20} />, label: 'Messages' },
              { id: 'settings', icon: <Settings size={20} />, label: 'Settings' }
            ].map((item) => (
              <li key={item.id} className="mb-2">
                <button 
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full py-3 px-4 ${
                    activeTab === item.id 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800'
                  } rounded-l-md transition-colors ${
                    activeTab === item.id ? 'border-l-4 border-green-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-center w-8">
                    {item.icon}
                  </div>
                  <span className="hidden md:block ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-800 mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={16} className="text-gray-300" />
            </div>
            <div className="hidden md:block ml-3">
              <div className="text-sm font-medium">Ajay Singh</div>
              <div className="text-xs text-gray-400">Premium Member</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 p-4 flex items-center justify-between">
          <div className="flex items-center w-1/2">
            <button className="md:hidden mr-4 text-gray-400">
              <Menu size={24} />
            </button>
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search venues..." 
                className="w-full bg-gray-800 text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Find Turf
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              My Bookings
            </a>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
            <button className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={16} className="text-gray-300" />
            </button>
          </div>
        </header>
        
        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto bg-black">
          {/* Hero Section */}
          <div className="relative h-80">
            <img 
              src="\turf.jpg" 
              alt="Football turf at night" 
              className="w-full h-full object-cover text-white"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-md">
                FIND THE BEST<br />
                VENUE NEAR<br />
                YOU!!
              </h1>
            </div>
          </div>
          
          {/* Popular Turfs Section */}
          <section className="px-6 md:px-16 py-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">POPULAR TURFS <span className="text-green-500">NEAR YOU!</span></h2>
              <a href="#" className="text-green-500 text-sm flex items-center">
                See all <ChevronRight size={16} />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTurfs.map((turf) => (
                <div key={turf.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={turf.image} 
                      alt={turf.name} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <div className="flex items-center">
                        <MapPin size={14} className="text-green-500 mr-1" />
                        <span className="text-xs">{turf.distance}</span>
                      </div>
                    </div>
                    <button className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:text-green-500">
                      <Heart size={16} />
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-sm">{turf.name}</h3>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span>{turf.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1" />
                        <span className="text-xs">{turf.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">({turf.reviews})</span>
                      </div>
                      <button className="text-xs px-2 py-1 bg-green-600 hover:bg-green-500 rounded text-white transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Sports Categories */}
          <section className="px-6 md:px-16 py-8 ">
            <h2 className="text-xl font-semibold mb-6">Choose Your Sport</h2>
            
            <div className="flex space-x-4 overflow-x-auto pb-4 flex justify-between">
              {sportsCategories.map((sport) => (
                <div key={sport.id} className={`${sport.color} text-black rounded-xl overflow-hidden w-32 h-40 flex flex-col relative group cursor-pointer`}>
                  <img 
                    src={sport.image} 
                    alt={sport.name} 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all"></div>
                  <div className="mt-auto p-3 bg-gradient-to-t from-black to-transparent relative z-10">
                    <h3 className="font-medium text-white">{sport.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Booking Status Section */}
          <section className="px-6 md:px-16 py-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-lg font-medium mb-4">Your Booking Status</h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img src="/turf.jpg" alt="Venue" className="w-20 h-20 rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-medium">Greenway Arena</h4>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Clock size={12} className="mr-1" />
                          <span>Today, 7:00 PM - 8:00 PM</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <MapPin size={12} className="mr-1" />
                          <span>Koramangala, 1.3 km away</span>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs rounded bg-yellow-500 text-black font-medium">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 md:pl-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Find nearby <span className="text-green-500">GAMES</span></h3>
                    <a href="#" className="text-green-500 text-sm flex items-center">
                      View all
                    </a>
                  </div>
                  <div className="bg-gray-800 rounded-lg overflow-hidden h-48">
                    <img 
                      src="/api/placeholder/400/200" 
                      alt="Map" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-gray-800 px-6 md:px-16 py-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                  <img src="/api/placeholder/32/32" alt="Turf-X Logo" className="h-8 w-8" />
                  <span className="ml-3 font-bold text-white">Turf-X</span>
                </div>
                <p className="text-sm text-gray-400 mt-2 max-w-xs">
                  Find and book sports venues near you. Play your favorite sports with ease.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    title: "Company",
                    links: ["About Us", "Blog", "Careers", "Contact"]
                  },
                  {
                    title: "Support",
                    links: ["Help Center", "Safety", "Terms", "Privacy"]
                  },
                  {
                    title: "Business",
                    links: ["List Your Venue", "Partnerships", "Success Stories"]
                  },
                  {
                    title: "Links",
                    links: ["Download App", "Tournaments", "Gift Cards"]
                  }
                ].map((section, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <a href="#" className="text-xs text-gray-400 hover:text-green-500 transition-colors">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-8 pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-4">
                <img src="/api/placeholder/24/24" alt="Google Play" className="h-6" />
                <img src="/api/placeholder/24/24" alt="App Store" className="h-6" />
                <div className="h-4 w-px bg-gray-700 mx-2"></div>
                <div className="flex space-x-3">
                  {["Facebook", "Twitter", "Instagram"].map((social, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                    >
                      <span className="text-xs">{social.charAt(0)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}