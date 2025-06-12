"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
  label?: string
  placeholder?: string
  error?: string
}

export function PhoneInput({
  value,
  onChange,
  required = false,
  className = "",
  label = "Telefon raqamingiz",
  placeholder = "+998 90 123 45 67",
  error,
}: PhoneInputProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e || !e.target) {
        console.error("Invalid event object in phone input")
        return
      }

      let newValue = e.target.value.replace(/[^\d+]/g, "")

      // Handle different input formats
      if (newValue.startsWith("+998")) {
        // Keep as is
      } else if (newValue.startsWith("998")) {
        newValue = "+" + newValue
      } else if (newValue.length > 0 && !newValue.startsWith("+")) {
        // If starts with 9, assume it's a local number
        if (newValue.startsWith("9") && newValue.length <= 9) {
          // Keep as is - will be formatted on submit
        } else {
          newValue = "+998" + newValue
        }
      }

      // Limit length
      if (newValue.startsWith("+998") && newValue.length > 13) {
        newValue = newValue.slice(0, 13)
      } else if (newValue.startsWith("9") && newValue.length > 9) {
        newValue = newValue.slice(0, 9)
      }

      setInputValue(newValue)
      if (onChange && typeof onChange === "function") {
        onChange(newValue)
      }
    } catch (error) {
      console.error("Phone input change error:", error)
    }
  }

  return (
    <div className={className}>
      <Label htmlFor="phone" className="text-sm font-medium text-gray-900 mb-2  block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id="phone"
        type="tel"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`border-2 h-12 ${error ? "border-red-500" : "border-purple-200"} focus:border-purple-500 rounded-lg`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
