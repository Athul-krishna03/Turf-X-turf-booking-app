"use client"
import type React from "react"
import {  useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import * as Yup from "yup"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ArrowLeft, Building, Edit, MapPin, Phone, Mail, KeyRound } from "lucide-react"
import { turfDetailsSchema } from "../../utils/validations/turfValidator"
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { updateTurfDetails, updateTurfProfilePayload } from "../../store/slices/turf.slice"
import { AppDispatch } from "../../store/store"
import { useTurfChangePassword } from "../../hooks/turf/useTurfDashboard"
import ChangeTurfPassword from "../modals/change-password-turf"



export default function TurfDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const turf = useSelector((state: any) => state.turf?.turf || {})
  
  console.log("turf state data",turf);
  const {mutateAsync } = useTurfChangePassword()
  const [editMode, setEditMode] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turfPhotos, setTurfPhotos] = useState<File[]>([])
  const [turfPhotoUrls, setTurfPhotoUrls] = useState<string[]>(turf.turfPhotos || [])


  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: turf.location.coordinates?.lat || 12.9716, // Default to Bangalore
    lng: turf.location.coordinates?.lng || 77.5946
  });
  
  
  const center: [number, number] = [coordinates.lat, coordinates.lng];
  // Form data state
  const [formData, setFormData] = useState({
    name: turf.name || "",
    address: turf.location.address || "",
    city: turf.location.city || "",
    state: turf.location.state || "",
    phone: turf.phone || "",
    email: turf.email || "",
    aminities: turf.aminities || ["Parking", "Changing Rooms", "Floodlights"],
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)

    // Validate file size and type
    const validFiles = newFiles.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`)
        return false
      }

      if (!file.type.match("image/*")) {
        toast.error(`${file.name} is not an image file.`)
        return false
      }

      return true
    })

    setTurfPhotos((prev) => [...prev, ...validFiles])

    // Create preview URLs
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTurfPhotoUrls((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove photo
  const removePhoto = (index: number) => {
    setTurfPhotoUrls((prev) => prev.filter((_, i) => i !== index))
    setTurfPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  // Upload photos to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      )
      return response.data.secure_url
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error)
      throw error
    }
  }

  // Save turf details
  const saveChanges = async () => {
    try {
      setIsSubmitting(true)

      // Validate form data
      await turfDetailsSchema.validate(formData, { abortEarly: false })

      // Upload new photos to Cloudinary
      let updatedPhotoUrls = [...turfPhotoUrls]
      if (turfPhotos.length > 0) {
        const uploadPromises = turfPhotos.map((photo) => uploadToCloudinary(photo))
        const newUrls = await Promise.all(uploadPromises)
        console.log("",newUrls);
        
        updatedPhotoUrls = [...turf.turfPhotos,...newUrls]
      }

      // Prepare data for API
      const updatedTurfData:updateTurfProfilePayload = {
        ...formData,
        location:{
            address:formData.address,
            city:formData.city,
            state: formData.state,
            coordinates: {
              lat: coordinates.lat,
              lng: coordinates.lng
            }
        },
        turfPhotos: updatedPhotoUrls,
      }
      await dispatch(updateTurfDetails(updatedTurfData))

      console.log("Updated turf data:", updatedTurfData)

      toast.success("Turf details updated successfully")
      setEditMode(false)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })
        console.error("Validation errors:", validationErrors)
        toast.error("Please correct the validation errors")
      } else {
        console.error("Error updating turf details:", error)
        toast.error("Failed to update turf details")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle password change
  const handlePasswordChange = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await mutateAsync({currPass:data.currentPassword,newPass:data.newPassword});
      console.log("pass cahnge turf",response);
      if(response.success){
              toast.success("User Password updated Successfully")
            }
      console.log("Password change data:", data)
      setShowPasswordChange(false)

      toast.success("Password changed successfully")
      return Promise.resolve()
    } catch (error: any) {
      toast.error(`Failed to change password: ${error.message || "Unknown error"}`)
      return Promise.reject(error)
    }
  }

  //location picker
  const LocationPicker = ({ setCoordinates }: { setCoordinates: (coords: { lat: number, lng: number }) => void }) => {
    useMapEvents({
      click(e: { latlng: { lat: any; lng: any } }) {
        setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };


  return (
    <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/turf/dashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Turf Details</h1>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="facilities">Facilities & Amenities</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Basic Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Manage your turf's basic details</CardDescription>
                  </div>
                  {!editMode && (
                    <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Turf Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            readOnly
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Location on Map (Click to select)</Label>
                        <div className="h-[400px] w-full mb-4">
                          <MapContainer
                            center={center}
                            zoom={13} 
                            style={{ height: '100%', width: '100%' }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[coordinates.lat, coordinates.lng]} />
                            <LocationPicker setCoordinates={setCoordinates} />
                          </MapContainer>
                        </div>
                        <div className="text-sm text-gray-500">
                          Selected coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button
                            onClick={saveChanges}
                            disabled={isSubmitting}
                            className="bg-green-600 hover:bg-green-500"
                        >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button onClick={() => setEditMode(false)} variant="outline">
                        Cancel
                        </Button>
                    </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Turf Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                            <Building className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                            <div>
                                <p className="font-medium">{formData.name}</p>
                            </div>
                            </div>

                            <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                                <p className="text-sm">{formData.address}</p>
                                <p className="text-sm">
                                {formData.city}, {formData.state}
                                </p>
                            </div>
                            </div>

                            <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-400 mr-2" />
                            <p className="text-sm">{formData.phone}</p>
                            </div>

                            <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <p className="text-sm">{formData.email}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </CardContent>
            </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
            <Card>
                <CardHeader>
                <CardTitle>Turf Photos</CardTitle>
                <CardDescription>Manage your turf's photos</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {turfPhotoUrls.map((url, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-48">
                        <img
                            src={url || "/placeholder.svg"}
                            alt={`Turf photo ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {editMode && (
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
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
                            >
                            <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                        )}
                    </div>
                    ))}

                    {editMode && (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-2 text-gray-500"
                        >
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" />
                        <path d="M16 5h6v6" />
                        <path d="M8 12l8-8" />
                        </svg>
                        <span className="text-sm text-gray-500">Add Photo</span>
                        <input type="file" className="hidden" accept="image/*" multiple onChange={handlePhotoUpload} />
                    </label>
                    )}
                </div>

                {editMode && (
                    <div className="flex space-x-4">
                    <Button onClick={saveChanges} disabled={isSubmitting} className="bg-green-600 hover:bg-green-500">
                        {isSubmitting ? "Saving..." : "Save Photos"}
                    </Button>
                    <Button onClick={() => setEditMode(false)} variant="outline">
                        Cancel
                    </Button>
                    </div>
                )}
                </CardContent>
            </Card>
            </TabsContent>
{/* Facilities Tab */}
            <TabsContent value="facilities">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Facilities & Amenities</CardTitle>
                    <CardDescription>Manage your turf's facilities and amenities</CardDescription>
                </div>
                {!editMode && (
                    <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Facilities
                    </Button>
                )}
                </CardHeader>
                <CardContent>
                {editMode ? (
                    <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            "Parking",
                            "Changing Rooms",
                            "Washrooms",
                            "Floodlights",
                            "Seating Area",
                            "Water Dispenser",
                            "First Aid Kit",
                            "Equipment Rental",
                            "Cafeteria",
                            "Locker Room",
                            "Shower",
                            "WiFi",
                        ].map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={facility}
                                checked={formData.aminities.includes(facility)}
                                onChange={(e) => {
                                if (e.target.checked) {
                                    setFormData((prev) => ({
                                    ...prev,
                                    facilities: [...prev.aminities, facility],
                                }))
                                } else {
                                    setFormData((prev) => ({
                                    ...prev,
                                    facilities: prev.aminities.filter((f: string) => f !== facility),
                                }))
                                }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <Label htmlFor={facility}>{facility}</Label>
                        </div>
                        ))}
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button
                            onClick={saveChanges}
                            disabled={isSubmitting}
                            className="bg-green-600 hover:bg-green-500"
                        >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button onClick={() => setEditMode(false)} variant="outline">
                            Cancel
                        </Button>
                    </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.aminities.map((facility:any) => (
                        <div key={facility} className="flex items-center">
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
                                className="mr-2 text-green-500"
                            >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                            <span className="text-sm">{facility}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </CardContent>
            </Card>
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value="security">
            <Card>
                <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="space-y-6">
                    {/* Password Change Button */}
                    <div>
                    <Button
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                        className="flex items-center"
                        variant="outline"
                    >
                        <KeyRound className="mr-2" size={16} />
                        {showPasswordChange ? "Hide Password Change" : "Change Password"}
                    </Button>
                    </div>
                    {/* Password Change Component */}
                    {showPasswordChange && (
                        <ChangeTurfPassword onSubmit={handlePasswordChange} onCancel={() => setShowPasswordChange(false)} />
                    )}
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    </div>
    </div>
)
}
