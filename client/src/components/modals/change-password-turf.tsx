"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Lock } from "lucide-react"
import * as Yup from "yup"
import { toast } from "sonner"

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
})

interface ChangePasswordProps {
  onSubmit: (data: { currentPassword: string; newPassword: string }) => Promise<void>
  onCancel: () => void
}

export default function ChangeTurfPassword({ onSubmit, onCancel }: ChangePasswordProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await passwordSchema.validate(formData, { abortEarly: false })

      await onSubmit({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })
        setErrors(validationErrors)
        toast.error("Please correct the validation errors")
      } else {
        toast.error("Failed to change password. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white text-black rounded-lg p-6 mt-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <Lock className="mr-2 text-green-600" size={20} />
        <h2 className="text-xl font-semibold">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className={`bg-white border-gray-300 text-black ${errors.currentPassword ? "border-red-500" : ""}`}
            placeholder="Enter your current password"
          />
          {errors.currentPassword && <p className="text-red-600 text-sm mt-1">{errors.currentPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            className={`bg-white border-gray-300 text-black ${errors.newPassword ? "border-red-500" : ""}`}
            placeholder="Enter your new password"
          />
          {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`bg-white border-gray-300 text-black ${errors.confirmPassword ? "border-red-500" : ""}`}
            placeholder="Confirm your new password"
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex space-x-4 pt-2">
          <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
          <Button type="button" onClick={onCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-black">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
