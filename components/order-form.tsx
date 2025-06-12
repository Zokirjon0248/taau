"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhoneInput } from "@/components/phone-input"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function OrderForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    package: "10 kunlik",
  })

  const [errors, setErrors] = useState<{
    name?: string
    phone?: string
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    try {
      const newErrors: { name?: string; phone?: string } = {}

      if (!formData || !formData.name || !formData.name.trim()) {
        newErrors.name = "Ismingizni kiriting"
      }

      if (!formData || !formData.phone) {
        newErrors.phone = "Telefon raqamingizni kiriting"
      } else {
        // Check if it's a valid Uzbekistan number
        const isValidUzNumber =
          (formData.phone.startsWith("+998") && formData.phone.length === 13) ||
          (formData.phone.startsWith("998") && formData.phone.length === 12) ||
          (formData.phone.startsWith("9") && formData.phone.length === 9)

        if (!isValidUzNumber) {
          newErrors.phone = "Noto'g'ri telefon raqami formati"
        }
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    } catch (error) {
      console.error("Form validation error:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (!e || typeof e.preventDefault !== "function") {
        console.error("Invalid event object")
        return
      }

      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response) {
        throw new Error("No response received")
      }

      const data = await response.json()

      if (data && data.success) {
        setIsSuccess(true)
        setFormData({
          name: "",
          phone: "",
          package: "10 kunlik",
        })

        toast({
          title: "Buyurtma qabul qilindi!",
          description: "Tez orada siz bilan bog'lanamiz.",
          variant: "default",
        })

        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        toast({
          title: "Xatolik!",
          description: (data && data.message) || "Buyurtma yuborishda xatolik yuz berdi.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Xatolik!",
        description: "Serverga ulanishda xatolik yuz berdi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-900 mb-2 block">
          Ismingiz <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`border-2 ${errors.name ? "border-red-500" : "border-purple-200"} focus:border-purple-500 rounded-lg h-12`}
          placeholder="Ismingizni kiriting"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <PhoneInput
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        required
        error={errors.phone}
        className="h-12"
      />

      <div className="space-y-3 pt-4">
        <Label className="text-sm font-medium text-gray-900   ">
          Paketni tanlang <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          defaultValue="10 kunlik"
          value={formData.package}
          onValueChange={(value) => setFormData({ ...formData, package: value })}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-3 border-2 border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
            <RadioGroupItem value="10 kunlik" id="package-10" className="text-purple-600" />
            <Label htmlFor="package-10" className="flex-1 cursor-pointer">
              <div className="font-medium text-sm md:text-base">10 kunlik kurs</div>
              <div className="text-sm text-gray-500">500,000 so'm</div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 border-2 border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
            <RadioGroupItem value="1 oylik" id="package-30" className="text-purple-600" />
            <Label htmlFor="package-30" className="flex-1 cursor-pointer">
              <div className="font-medium text-sm md:text-base">1 oylik kurs</div>
              <div className="text-sm text-gray-500">700,000 so'm</div>
            </Label>
            <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Eng yaxshi narx
            </div>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-4 md:py-6 rounded-lg transition-colors duration-300 text-sm md:text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Yuborilmoqda...
          </>
        ) : isSuccess ? (
          "Buyurtma qabul qilindi! ✓"
        ) : (
          "Buyurtma berish"
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        Buyurtma berishda, siz bizning mahsulotimizdan foydalanishga rozilik bildirasiz
      </p>
    </form>
  )
}
