"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { User, ArrowLeft, Edit, KeyRound, Wallet, CreditCard, Eye, EyeOff, Plus } from "lucide-react"
import * as Yup from "yup"
import { AnySchema } from "yup"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { profileSchema } from "../../utils/validations/profileValidator"
import { uploadProfileImageCloudinary } from "../../utils/cloudinaryImageUpload"
import { type updateProfilePayload, updateUserProfile } from "../../store/slices/user.slice"
import {type AppDispatch } from "../../store/store"
import ChangePassword from "../../components/modals/change-password"
import { useUserChangePassword } from "../../hooks/user/userDashboard"
import { Sidebar } from "../../components/layout/Sidebar"

const Profile = () => {
  const user = useSelector((state: any) => state.user.user)
  console.log("user in profile page", user)
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null)
  const [selectedPosition, setSelectedPosition] = useState(user?.position || "Not specified")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { mutateAsync } = useUserChangePassword()
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    position: user?.position,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    try {
      const schema = Yup.reach(profileSchema, name)
      if (schema && typeof (schema as AnySchema).validate === "function") {
        await (schema as AnySchema).validate(value)
        setFormErrors((prev) => ({ ...prev, [name]: "" }))
      }
    } catch (err: any) {
      setFormErrors((prev) => ({ ...prev, [name]: err.message }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.")
      return
    }

    if (!file.type.match("image/*")) {
      toast.error("Only image files are allowed.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setProfileImage(reader.result as string)
    reader.readAsDataURL(file)
    setSelectedImage(file)
  }

  const saveChanges = async () => {
    const updatedData = {
      name: formData.name.trim(),
      phone: formData.phone.trim() || null,
      position: selectedPosition,
    }

    try {
      await profileSchema.validate(updatedData, { abortEarly: false })

      let imageUrl = profileImage || ""
      if (selectedImage) {
        const response = await uploadProfileImageCloudinary(selectedImage)
        if (response) imageUrl = response
      }

      const profileData: updateProfilePayload = {
        name: updatedData.name,
        phone: updatedData.phone || "",
        position: updatedData.position || "",
        profileImage: imageUrl,
      }

      const response = await dispatch(updateUserProfile(profileData))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("User details updated successfully")
      } else {
        toast.error("Error in editing profile")
      }
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message
        })
        setFormErrors(validationErrors)
        toast.error("Please correct the validation errors")
      } else {
        toast.error(`Failed updating user profile: ${error.message || "Unknown error"}`)
      }
    }

    setEditMode(false)
  }

  const handlePasswordChange = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await mutateAsync({ currPass: data.currentPassword, newPass: data.newPassword })
      if (response.success) toast.success("User Password updated successfully")
      setShowPasswordChange(false)
      return Promise.resolve()
    } catch (error: any) {
      toast.error("Error in updating password")
      return Promise.reject(error)
    }
  }

  const hasErrors = Object.values(formErrors).some((msg) => msg)

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-black-800 overflow-auto">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate("/")} 
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
          </div>

          {/* Profile Content */}
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
              {/* Profile Header */}
              <div className="relative h-40 bg-gradient-to-r from-green-600/20 to-blue-600/20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <Avatar className="h-28 w-28 border-4 border-white/20 shadow-xl ring-4 ring-green-500/30">
                      {profileImage ? (
                        <AvatarImage src={profileImage || "/placeholder.svg"} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-2xl">
                          <User size={40} />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {editMode && (
                      <label
                        htmlFor="profile-picture"
                        className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-500 transition-colors shadow-lg"
                      >
                        <Edit size={14} />
                        <input
                          type="file"
                          id="profile-picture"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20"
                  >
                    <Edit size={18} />
                  </button>
                )}
              </div>

              {/* Profile Content */}
              <div className="pt-20 px-8 pb-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    {formData.name}
                  </h1>
                  <p className="text-gray-400 text-lg">{selectedPosition}</p>
                </div>

                {editMode ? (
                  <div className="space-y-6">
                    <div className="grid gap-6">
                      {["name", "email", "phone"].map((field) => (
                        <div className="space-y-2" key={field}>
                          <Label htmlFor={field} className="text-sm font-medium text-gray-300">
                            {field[0].toUpperCase() + field.slice(1)}
                          </Label>
                          <Input
                            id={field}
                            name={field}
                            type={field === "email" ? "email" : "text"}
                            value={(formData as any)[field]}
                            onChange={handleInputChange}
                            className="bg-gray-700/50 border-gray-600/50 focus:border-green-400 focus:ring-green-500 rounded-xl text-white"
                            readOnly={field === "email"} 
                          />
                          {formErrors[field] && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                              {formErrors[field]}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-sm font-medium text-gray-300">
                          Playing Position
                        </Label>
                        <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 focus:border-green-500/50 rounded-xl">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                            <SelectItem value="Defender">Defender</SelectItem>
                            <SelectItem value="Midfielder">Midfielder</SelectItem>
                            <SelectItem value="Forward">Forward</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button 
                        onClick={() => setEditMode(false)} 
                        className="flex-1 bg-gray-600/80 hover:bg-gray-500/80 rounded-xl transition-all duration-200"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={saveChanges}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-xl transition-all duration-200 shadow-lg"
                        disabled={hasErrors}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      {[
                        { label: "Email", value: formData.email },
                        { label: "Phone", value: formData.phone || "Not provided" },
                        { label: "Playing Position", value: selectedPosition }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-4 px-6 bg-gray-700/30 rounded-xl border border-gray-600/30">
                          <span className="text-gray-400 font-medium">{item.label}</span>
                          <span className="text-white font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                        className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all duration-200 shadow-lg"
                      >
                        <KeyRound className="mr-2" size={18} />
                        {showPasswordChange ? "Hide Password Change" : "Change Password"}
                      </Button>
                    </div>
                  </div>
                )}

                {showPasswordChange && !editMode && (
                  <div className="mt-6">
                    <ChangePassword onSubmit={handlePasswordChange} onCancel={() => setShowPasswordChange(false)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile