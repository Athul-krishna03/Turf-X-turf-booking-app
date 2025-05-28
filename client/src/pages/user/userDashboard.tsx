import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { Star, MapPin, ChevronRight, Clock, Heart, Users } from 'lucide-react';
import { getAllTurfsData } from '../../services/user/userServices';
import { useGetAllTurfsQuery } from '../../hooks/admin/useGetAllTurfs';
import { ITurf } from '../../types/Type';
import { useDispatch } from 'react-redux';
import { setTurfs } from '../../store/slices/turfsDataslice';
import { useNavigate } from 'react-router-dom';

export default function TurfXDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const limit = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const searchData = (val: string) => {
    setSearchQuery(val);
  };

  const { data } = useGetAllTurfsQuery(
    getAllTurfsData,
    currentPage,
    limit,
    debouncedSearch
  );

  const turfs = (data?.turfs ?? []) as ITurf[];
  dispatch(setTurfs(turfs));
  console.log(turfs);

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
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} setSearchVal={searchData} />

        <main className="flex-1 overflow-y-auto">
          <section className="relative h-96 overflow-hidden">
            <div className="absolute inset-0 "></div>
            <img 
              src="\public\kb.jpg" 
              alt="Sports venue at night" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                  <span className="bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
                    Play Your
                  </span>
                  <br />
                  <span className="text-white">Best Game</span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Discover premium sports venues near you and book instantly. Join games, meet players, and elevate your sporting experience.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-xl">
                    Find Venues
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-2xl font-semibold transition-all"
                  onClick={()=>navigate("/user/hostedGames")}
                  >
                    Join a Game
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-16 mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                Popular Venues <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Near You</span>
              </h2>
              <button className="text-green-400 hover:text-green-300 flex items-center transition-colors">
                View All <ChevronRight size={18} className="ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {turfs.map((turf) => (
                <div key={turf._id} className="group bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={turf.turfPhotos[0]} 
                      alt={turf.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur text-white hover:text-red-400 hover:bg-red-500/20 transition-all">
                      <Heart size={18} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center text-white">
                      <MapPin size={14} className="text-green-400 mr-1" />
                      <span className="text-sm font-medium">{turf.location.city}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-white">{turf.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{5}</span>
                        <span className="text-sm text-gray-400 ml-1">({turf?.courtSize})</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-semibold transition-all transform hover:scale-105"
                      onClick={() => navigate(`/user/turfDetialsPage/${turf.turfId}`)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-16 mb-12">
            <h2 className="text-3xl font-bold mb-8">Your Activity</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="mr-2 text-green-400" size={20} />
                  Current Booking
                </h3>
                <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-4">
                  <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop" alt="Venue" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-white">Greenway Arena</h4>
                    <p className="text-sm text-gray-400 mt-1">Today, 7:00 PM - 8:00 PM</p>
                    <p className="text-sm text-gray-400">Koramangala, 1.3 km away</p>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 mt-2">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="mr-2 text-green-400" size={20} />
                  Nearby Games
                </h3>
                <div className="space-y-3">
                  {[
                    { sport: 'Football', time: '6:00 PM', players: '8/11', venue: 'Elite Arena' },
                    { sport: 'Cricket', time: '7:30 PM', players: '18/22', venue: 'Victory Ground' }
                  ].map((game, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-xl p-3">
                      <div>
                        <p className="font-medium text-white">{game.sport} • {game.venue}</p>
                        <p className="text-sm text-gray-400">{game.time} • {game.players} players</p>
                      </div>
                      <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
