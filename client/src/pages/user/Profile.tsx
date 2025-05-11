"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { User, ArrowLeft, Edit, KeyRound } from "lucide-react"
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

const Profile = () => {
  const user = useSelector((state: any) => state.user.user)
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null)
  const [selectedPosition, setSelectedPosition] = useState(user?.position || "Not specified")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { mutateAsync } = useUserChangePassword()

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <button onClick={() => navigate("/")} className="flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-32 bg-gray-700">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-gray-800">
                  {profileImage ? (
                    <AvatarImage src={profileImage || "/placeholder.svg"} />
                  ) : (
                    <AvatarFallback className="bg-gray-700 text-gray-300 text-xl">
                      <User size={32} />
                    </AvatarFallback>
                  )}
                </Avatar>
                {editMode && (
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 bg-gray-900 p-1 rounded-full cursor-pointer hover:bg-gray-700"
                  >
                    <Edit size={16} />
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
                className="absolute top-4 right-4 bg-green-700 p-2 rounded-full hover:bg-green-600"
              >
                <Edit size={16} />
              </button>
            )}
          </div>

          <div className="pt-16 px-6 pb-6">
            <h1 className="text-2xl font-bold text-center mb-6">{formData.name}</h1>

            {editMode ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  {["name", "email", "phone"].map((field) => (
                    <div className="grid gap-2" key={field}>
                      <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
                      <Input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={(formData as any)[field]}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                      readOnly={field === "email"} 
                    />
                      {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
                    </div>
                  ))}

                  <div className="grid gap-2">
                    <Label htmlFor="position">Playing Position</Label>
                    <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
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

                <div className="flex space-x-4 pt-4">
                  <Button onClick={() => setEditMode(false)} className="flex-1 bg-gray-600 hover:bg-gray-500">
                    Cancel
                  </Button>
                  <Button
                    onClick={saveChanges}
                    className="flex-1 bg-green-600 hover:bg-green-500"
                    disabled={hasErrors}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700">
                    <span className="text-gray-400">Email</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700">
                    <span className="text-gray-400">Phone</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700">
                    <span className="text-gray-400">Playing Position</span>
                    <span>{selectedPosition}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="w-full flex items-center justify-center bg-green-700 hover:bg-green-600"
                  >
                    <KeyRound className="mr-2" size={16} />
                    {showPasswordChange ? "Hide Password Change" : "Change Password"}
                  </Button>
                </div>
              </div>
            )}

            {showPasswordChange && !editMode && (
              <ChangePassword onSubmit={handlePasswordChange} onCancel={() => setShowPasswordChange(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
