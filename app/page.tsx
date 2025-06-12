"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OrderForm } from "@/components/order-form"
import {
  Phone,
  Instagram,
  Send,
  Zap,
  ShieldCheck,
  Leaf,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Award,
  Flame,
  Heart,
  Brain,
  Activity,
  Shield,
} from "lucide-react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      try {
        if (typeof window !== "undefined" && window.scrollY !== undefined) {
          if (window.scrollY > 50) {
            setIsScrolled(true)
          } else {
            setIsScrolled(false)
          }
        }
      } catch (error) {
        console.error("Scroll handler error:", error)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => {
        try {
          window.removeEventListener("scroll", handleScroll)
        } catch (error) {
          console.error("Error removing scroll listener:", error)
        }
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      try {
        setCountdown((prev) => {
          if (!prev) return { days: 2, hours: 23, minutes: 59, seconds: 59 }

          const newSeconds = prev.seconds - 1

          if (newSeconds >= 0) {
            return { ...prev, seconds: newSeconds }
          }

          const newMinutes = prev.minutes - 1
          if (newMinutes >= 0) {
            return { ...prev, minutes: newMinutes, seconds: 59 }
          }

          const newHours = prev.hours - 1
          if (newHours >= 0) {
            return { ...prev, hours: newHours, minutes: 59, seconds: 59 }
          }

          const newDays = prev.days - 1
          if (newDays >= 0) {
            return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 }
          }

          // If countdown is finished, stop the timer
          clearInterval(timer)
          return prev
        })
      } catch (error) {
        console.error("Countdown timer error:", error)
      }
    }, 1000)

    return () => {
      try {
        clearInterval(timer)
      } catch (error) {
        console.error("Error clearing timer:", error)
      }
    }
  }, [mounted])

  const scrollToSection = (sectionId: string) => {
    try {
      if (typeof window !== "undefined" && sectionId) {
        const element = document.getElementById(sectionId)
        if (element && element.scrollIntoView) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } catch (error) {
      console.error("Scroll to section error:", error)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8f5ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-900">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  try {
    return (
      <div className="min-h-screen bg-[#f8f5ff] scroll-smooth">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-2 md:py-4" : "bg-transparent py-3 md:py-6"
            }`}
        >
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-purple-700" />
              </div>
              <h1 className="text-lg md:text-2xl font-semibold text-gradient">MAXIMUM POWER</h1>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-800 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Foydalar
              </button>
              <button
                onClick={() => scrollToSection("ingredients")}
                className="text-gray-800 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Tarkibi
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-gray-800 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Sharhlar
              </button>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden lg:flex items-center space-x-2 text-gray-800">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+998 95 809 90 32</span>
              </div>
              <Button
                onClick={() => scrollToSection("order")}
                className="bg-purple-700 hover:bg-purple-800 text-white rounded-full px-3 py-2 md:px-6 md:py-3 text-sm md:text-base cursor-pointer"
              >
                <span className="hidden sm:inline">Buyurtma berish</span>
                <span className="sm:hidden">Buyurtma</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-20 md:pt-32 pb-10 md:pb-20 bg-gradient-to-b from-purple-50 to-[#f8f5ff]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4 md:mb-6 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full">
                  100% Tabiiy Mahsulot
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Erkaklar kuchi uchun <span className="text-gradient">MAXIMUM POWER</span>
                </h2>
                <p className="text-sm md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  7 ta tabiiy komponentdan iborat maxsus formula erkaklar quvvati, jinsiy faolligi va umumiy
                  salomatligini oshirish uchun yaratilgan. 15 kun ichida natija ko'ring!
                </p>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 md:mb-8">
                  <Button
                    onClick={() => scrollToSection("order")}
                    size="lg"
                    className="bg-purple-700 hover:bg-purple-800 text-white rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base cursor-pointer"
                  >
                    Buyurtma berish
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button
                    onClick={() => scrollToSection("ingredients")}
                    variant="outline"
                    size="lg"
                    className="border-purple-700 text-purple-700 hover:bg-purple-50 rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base cursor-pointer"
                  >
                    Tarkibini ko'rish
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-4">
                  <div className="flex items-center space-x-2 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                    <span className="text-xs md:text-sm font-medium">Sertifikatlangan</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm">
                    <Leaf className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                    <span className="text-xs md:text-sm font-medium">100% Tabiiy</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                    <span className="text-xs md:text-sm font-medium">15 kun ichida natija</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-200 max-w-md mx-auto lg:max-w-none">
                  <Image
                    src="/images/maximumPower1.jpg"
                    alt="Maximum Power mahsuloti"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
                </div>

                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-lg shadow-xl p-3 md:p-4 flex items-center space-x-2 md:space-x-3">
                  <div className="bg-green-100 rounded-full p-1.5 md:p-2">
                    <CheckCircle2 className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-900">Sertifikatlangan</p>
                    <p className="text-xs text-gray-500">Sifat nazoratidan o'tgan</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-lg shadow-xl p-2 md:p-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Aksiya tugashiga:</p>
                    <div className="flex space-x-1 md:space-x-2">
                      <div className="bg-purple-100 rounded px-1.5 md:px-2 py-1">
                        <span className="text-sm md:text-lg font-bold text-purple-800">{countdown.days}</span>
                        <p className="text-xs text-purple-600">kun</p>
                      </div>
                      <div className="bg-purple-100 rounded px-1.5 md:px-2 py-1">
                        <span className="text-sm md:text-lg font-bold text-purple-800">{countdown.hours}</span>
                        <p className="text-xs text-purple-600">soat</p>
                      </div>
                      <div className="bg-purple-100 rounded px-1.5 md:px-2 py-1">
                        <span className="text-sm md:text-lg font-bold text-purple-800">{countdown.minutes}</span>
                        <p className="text-xs text-purple-600">daq</p>
                      </div>
                      <div className="bg-purple-100 rounded px-1.5 md:px-2 py-1">
                        <span className="text-sm md:text-lg font-bold text-purple-800">{countdown.seconds}</span>
                        <p className="text-xs text-purple-600">son</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-10 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-16">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-3 md:mb-4 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full">
                Asosiy Foydalar
              </Badge>
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Nima uchun MAXIMUM POWER?</h3>
              <p className="text-sm md:text-lg text-gray-700 max-w-2xl mx-auto">
                7 ta tabiiy komponentdan iborat maxsus formula erkaklar salomatligini kompleks qo'llab-quvvatlaydi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Flame className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Jinsiy quvvatni oshiradi</h4>
                <p className="text-gray-700">
                  Chakshir (Ferula Communis) testosteron ishlab chiqarishni rag'batlantiradi va erkaklar jinsiy
                  salomatligini tabiiy yo'l bilan qo'llab-quvvatlaydi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Energiya va quvvat beradi</h4>
                <p className="text-gray-700">
                  Ginseng ekstrakti charchoqni kamaytiradi, quvvatni oshiradi va jinsiy faoliyatni faollashtiradi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Gormon balansini tartibga soladi</h4>
                <p className="text-gray-700">
                  Arı suti (Royal Jelly) organizmga tabiiy energiya beradi va jinsiy gormonlar muvozanatini tiklashga
                  yordam beradi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Qon aylanishi va aqliy faollikni oshiradi</h4>
                <p className="text-gray-700">
                  Ginkgo Biloba miya va tana qon aylanishini yaxshilaydi, bu esa jinsiy faollikka ijobiy ta'sir
                  ko'rsatadi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Yallig'lanishga qarshi ta'sir</h4>
                <p className="text-gray-700">
                  Zerdeçal (Curcuma) tanani yallig'lanishdan tozalaydi va umumiy sog'liqni, shu jumladan jinsiy quvvatni
                  oshiradi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Immunitetni mustahkamlaydi</h4>
                <p className="text-gray-700">
                  Mahsulot tarkibidagi tabiiy komponentlar immunitetni kuchaytiradi, tanani mikrob va viruslardan himoya
                  qiladi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Info Section */}
        <section className="py-20 bg-purple-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/maximumPower2.jpg"
                      alt="Maximum Power mahsuloti"
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute md:-bottom-8 md:-right-8 bottom-1/2 right-0 translate-y-1/2 md:translate-y-0 bg-white rounded-xl shadow-xl p-3 md:p-6 max-w-[200px] md:max-w-xs">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">5.0 (200+ sharhlar)</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "15 kun ichida natija ko'rdim. Energiyam oshdi va jinsiy hayotim yaxshilandi!"
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-6 px-4 py-1.5 text-sm rounded-full">
                  Mahsulot Haqida
                </Badge>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">MAXIMUM POWER - erkaklar kuchi uchun</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  MAXIMUM POWER - bu 7 ta tabiiy komponentdan iborat maxsus formula bo'lib, erkaklar jinsiy quvvati,
                  energiyasi va umumiy salomatligini oshirish uchun yaratilgan. Mahsulot 100% tabiiy bo'lib, tarkibida
                  kimyoviy qo'shimchalar yo'q.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0 mb-10 justify-center text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-700">500,000 so'm</div>

                  <div className="relative inline-block">
                    <div className="text-lg sm:text-xl text-gray-500 line-through">600,000 so'm</div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/4 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded shadow">
                      -17%
                    </div>
                  </div>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-2 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">10 kunlik kurs</h4>
                      <p className="text-sm text-gray-700">500,000 so'm</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-2 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">1 oylik kurs</h4>
                      <p className="text-sm text-gray-700">700,000 so'm</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-2 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Yetkazib berish</h4>
                      <p className="text-sm text-gray-700">Butun O'zbekiston bo'ylab</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-2 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">15 kun ichida natija</h4>
                      <p className="text-sm text-gray-700">Kafolatlangan ta'sir</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => scrollToSection("order")}
                  className="bg-purple-700 hover:bg-purple-800 text-white rounded-full px-8 py-6 text-lg group cursor-pointer"
                >
                  Hoziroq buyurtma berish
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section id="ingredients" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4 px-4 py-1.5 text-sm rounded-full">
                Tarkibi
              </Badge>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">7 ta tabiiy komponent</h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Har bir komponent maxsus tanlangan va erkaklar salomatligiga ijobiy ta'sir ko'rsatadi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ginseng ekstrakti</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Immunitetni mustahkamlaydi</li>
                  <li>• Charchoq va quvvat yetishmasligiga qarshi</li>
                  <li>• Stressni kamaytiradi</li>
                  <li>• Jinsiy faoliyatni qo'llab-quvvatlaydi</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Arı suti (Royal Jelly)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Gormonlar balansini tartibga soladi</li>
                  <li>• Organizmga energiya beradi</li>
                  <li>• Teri va soch salomatligini qo'llab-quvvatlaydi</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ginkgo Biloba ekstrakti</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Miya qon aylanishini yaxshilaydi</li>
                  <li>• Xotira va aqliy faollikni oshiradi</li>
                  <li>• Qarilikda kognitiv funksiyalarni qo'llab-quvvatlaydi</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Zerdeçal (Curcuma)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Kuchli yallig'lanishga qarshi vosita</li>
                  <li>• Jigarni tozalashga yordam beradi</li>
                  <li>• Tana og'riqlarini kamaytiradi</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Flame className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Chakshir (Ferula Communis)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Erkaklar jinsiy sog'lig'ini qo'llab-quvvatlaydi</li>
                  <li>• Testosteron ishlab chiqarishni rag'batlantiradi</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Dolchin (Tarçın)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Qon aylanishini yaxshilaydi</li>
                  <li>• Qandli diabetga qarshi foydali</li>
                  <li>• Antiseptik xususiyatga ega</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Kebabiye (Fructus Cubebae)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Mikrob va viruslarga qarshi vosita</li>
                  <li>• Siydik haydovchi xususiyatga ega</li>
                  <li>• Nafas yo'llarini tozalaydi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for Section */}
        <section className="py-20 bg-purple-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4 px-4 py-1.5 text-sm rounded-full">
                Kimlar uchun
              </Badge>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">MAXIMUM POWER kimlar uchun mo'ljallangan?</h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                20 yoshdan 50 yoshgacha bo'lgan erkaklar uchun maxsus ishlab chiqilgan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Agar sizda quyidagi muammolar bo'lsa:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Jinsiy quvvat va testosteron darajasining pasayishi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Surunkali charchoq, energiya yetishmasligi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Stress, ruhiy tushkunlik</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Qon aylanishi va miya faoliyatining sustligi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Gormonlar muvozanatsizligi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Zaiflashgan immunitet</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">MAXIMUM POWER sizga yordam beradi:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <Flame className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Jinsiy quvvatni oshiradi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Tabiiy energiya va quvvat beradi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Stressni kamaytiradi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Xotira va aqliy faollikni yaxshilaydi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Activity className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Qon aylanishini faollashtiradi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Gormon balansini tartibga soladi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4 px-4 py-1.5 text-sm rounded-full">
                Mijozlar Fikrlari
              </Badge>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Mijozlarimiz biz haqimizda</h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                200+ mijozlarimizning ijobiy sharhlari bizning mahsulotimiz sifatini tasdiqlaydi
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "MAXIMUM POWER ishlatganimdan keyin energiyam sezilarli darajada oshdi. 2 hafta ichida o'zimni yangi
                  odam kabi his qildim. Jinsiy hayotim ham yaxshilandi."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-700 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">A.K</p>
                    <p className="text-xs text-gray-500">32 yosh, Toshkent</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Dastlab shubha qildim, lekin natija meni hayratda qoldirdi. Charchoq yo'qoldi, ish joyida ham faolroq
                  bo'ldim. Xotiram ham yaxshilandi."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-700 font-semibold">B</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">B.A</p>
                    <p className="text-xs text-gray-500">28 yosh, Samarqand</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Tabiiy mahsulot ekanligini bilganimdan keyin xotirjam bo'ldim. Yon ta'siri yo'q, natija esa ajoyib.
                  Barcha do'stlarimga tavsiya qilaman."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-700 font-semibold">D</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">D.R</p>
                    <p className="text-xs text-gray-500">35 yosh, Farg'ona</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Form */}
        <section id="order" className="py-10 md:py-20 bg-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl border border-purple-100">
              <div className="lg:w-1/2 bg-purple-700 p-6 md:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 opacity-90"></div>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20"></div>
                  <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20"></div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Buyurtma berish</h3>
                  <p className="text-purple-100 mb-6 md:mb-8 text-sm md:text-base">
                    Formani to'ldiring va biz siz bilan tez orada bog'lanamiz. Mahsulotlarimiz haqida qo'shimcha
                    savollaringiz bo'lsa, bizga qo'ng'iroq qiling.
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="bg-purple-600/50 rounded-full p-2 md:p-3">
                        <Phone className="h-4 w-4 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-purple-200">Telefon</p>
                        <p className="font-medium text-sm md:text-base">+998 95 809 90 32</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="bg-purple-600/50 rounded-full p-2 md:p-3">
                        <Send className="h-4 w-4 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-purple-200">Telegram</p>
                        <p className="font-medium text-sm md:text-base">@taau_uz</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="bg-purple-600/50 rounded-full p-2 md:p-3">
                        <Instagram className="h-4 w-4 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-purple-200">Instagram</p>
                        <p className="font-medium text-sm md:text-base">taau.uz</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 p-3 md:p-4 bg-purple-600/30 rounded-lg">
                    <p className="text-xs md:text-sm text-purple-100 mb-2">⚡ Maxsus taklif:</p>
                    <p className="font-medium text-sm md:text-base">
                      Atigi 30,000 so'm evaziga mahsulot uyingizgacha yetkaziladi!
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 p-6 md:p-12">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Buyurtma formasi</h3>
                <OrderForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-purple-800/50 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-300" />
                  </div>
                  <h4 className="text-2xl font-semibold text-white">MAXIMUM POWER</h4>
                </div>
                <p className="text-gray-400 mb-6">
                  Erkaklar kuchi va quvvatini oshirish uchun 100% tabiiy mahsulot. 7 ta tabiiy komponentdan iborat
                  maxsus formula.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://t.me/taau_uz"
                    className="bg-gray-800/30 hover:bg-gray-800/50 p-2 rounded-full transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/taau.uz"
                    className="bg-gray-800/30 hover:bg-gray-800/50 p-2 rounded-full transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="tel:+998958099032"
                    className="bg-gray-800/30 hover:bg-gray-800/50 p-2 rounded-full transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-white font-semibold mb-6">Mahsulot</h5>
                <ul className="space-y-3">
                  <li>
                    <a href="#benefits" className="hover:text-white transition-colors">
                      Foydalar
                    </a>
                  </li>
                  <li>
                    <a href="#ingredients" className="hover:text-white transition-colors">
                      Tarkibi
                    </a>
                  </li>
                  <li>
                    <a href="#reviews" className="hover:text-white transition-colors">
                      Sharhlar
                    </a>
                  </li>
                  <li>
                    <a href="#order" className="hover:text-white transition-colors">
                      Buyurtma berish
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-white font-semibold mb-6">Ma'lumot</h5>
                <ul className="space-y-3">
                  <li>
                    <span className="text-gray-400">Narx: 500,000 - 700,000 so'm</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Yetkazib berish: 30,000 so'm</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Natija: 15 kun ichida</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Kafolat: 15 kun</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-white font-semibold mb-6">Bog'lanish</h5>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>+998 95 809 90 32</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Send className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>@taau_uz</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Instagram className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>taau.uz</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p>&copy; 2024 MAXIMUM POWER. Barcha huquqlar himoyalangan.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error("Render error:", error)
    return (
      <div className="min-h-screen bg-[#f8f5ff] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Xatolik yuz berdi. Sahifani yangilang.</p>
        </div>
      </div>
    )
  }
}
