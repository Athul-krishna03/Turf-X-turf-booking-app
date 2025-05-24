"use client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "../../components/ui/card"
import {Avatar,AvatarFallback,AvatarImage} from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import {CalendarDays,Clock,MapPin,Users,Wallet,Star,Trophy} from "lucide-react"
import { getJoinedGameDetials } from "../../services/user/userServices"
import { JoinedGameData } from "../../types/BookingDetialsTypes"

const JoinedGameDetails = () => {
  const { joinedGameId } = useParams()
  const [joinedGameData, setJoinedGameData] = useState<JoinedGameData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const totalContributions =  joinedGameData ? Object.values(joinedGameData?.booking.walletContributions).reduce((acc, val) => acc + val, 0): 0

  useEffect(() => {
    const fetchJoinedGameData = async () => {
      try {
        setLoading(true)
        const response = await getJoinedGameDetials(joinedGameId)
        console.log("response joinedslot", response)
        setJoinedGameData(response)
        setError(null)
      } catch (err) {
        console.error("Error fetching game details:", err)
        setError("Could not load game details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (joinedGameId) {
      fetchJoinedGameData()
    }
  }, [joinedGameId])

   if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-black text-white">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-700 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-black text-white">
        <div className="text-red-400 mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!joinedGameData) {
    return (
      <div className="text-center p-8 bg-black text-white">
        <div className="text-gray-400">No data found for this game.</div>
      </div>
    )
  }

  const { booking, turf } = joinedGameData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  Game Session
                </h1>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {booking.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {booking.time}
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    {booking.duration} hrs
                  </div>
                </div>
              </div>
              <Badge
                className={`${
                  booking.status === "confirmed"
                    ? "bg-green-800/50 text-green-200 border-green-600"
                    : booking.status === "pending"
                    ? "bg-yellow-700/50 text-yellow-200 border-yellow-600"
                    : "bg-red-800/50 text-red-200 border-red-600"
                } px-4 py-2 text-sm capitalize border backdrop-blur-sm`}
              >
                {booking.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column - Turf Details */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Turf Information Card */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img
                  src={turf.turfPhotos[0] || "/placeholder.svg?height=320&width=800"}
                  alt={turf.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{turf.name}</h2>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{turf.location.city}, {turf.location.state}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div>
                  <h3 className="font-semibold text-green-400 mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Available Facilities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {turf.aminities.map((facility: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50 transition-colors"
                      >
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants Card */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <Users className="w-5 h-5 mr-2" />
                  Team Members ({booking.userIds.length})
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Players joining this game session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {booking.userIds.map((user: any, index: number) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-200 border border-gray-700/50"
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-green-500/30">
                            <AvatarImage src={user.profileImage || "/placeholder.svg"} />
                            <AvatarFallback className="bg-green-600 text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                              <Trophy className="w-3 h-3 text-black" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-white">
                            {user.name}
                            {index === 0 && <span className="text-yellow-400 text-xs ml-2">ORGANIZER</span>}
                          </div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-green-300 bg-green-500/10 px-3 py-1 rounded-lg">
                        <Wallet className="w-4 h-4 mr-1" />
                        <span className="font-medium">₹{booking.price / booking.playerCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment & Summary */}
          <div className="space-y-6">
            
            {/* Booking Summary */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-green-400">Booking Summary</CardTitle>
                <CardDescription className="text-gray-400">
                  Payment and pricing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Total Game Cost</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ₹{booking.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    ₹{(booking.price / booking.playerCount).toFixed(2)} per player
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{booking.duration} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white">{booking.playerCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date & Time</span>
                    <span className="text-white">{booking.date}, {booking.time}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Organized by</div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={booking.userIds[0].profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="bg-green-600 text-white text-sm">
                        {booking.userIds[0].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white font-medium">{booking.userIds[0].name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game Wallet */}
            <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-green-700/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <Wallet className="w-5 h-5 mr-2" />
                  Game Wallet
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Collected contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-600/30">
                  <div className="text-sm text-gray-400 mb-2">Current Balance</div>
                  <div className="text-3xl font-bold text-green-300">
                    ₹{totalContributions.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {((totalContributions / booking.price) * 100).toFixed(1)}% collected
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalContributions / booking.price) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinedGameDetails