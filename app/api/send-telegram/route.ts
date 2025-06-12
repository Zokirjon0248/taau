import { NextResponse } from "next/server"
import { sendTelegramMessage, formatOrderMessage } from "@/lib/telegram"

const BOT_TOKEN = "7825515390:AAGGLSIcDkP5u_YyaDSH4qNmBQwO1EXUcqg"
const CHAT_ID = "-4872080092"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.package) {
      return NextResponse.json({ success: false, message: "Barcha maydonlarni to'ldiring" }, { status: 400 })
    }

    // Format phone number if needed
    let phoneNumber = formData.phone
    if (phoneNumber.startsWith("9") && phoneNumber.length === 9) {
      phoneNumber = `+998${phoneNumber}`
    }

    // Format the message
    const message = formatOrderMessage({
      ...formData,
      phone: phoneNumber,
    })

    // Send to Telegram
    const result = await sendTelegramMessage(BOT_TOKEN, CHAT_ID, message)

    if (result.success) {
      return NextResponse.json({ success: true, message: "Buyurtma muvaffaqiyatli yuborildi" })
    } else {
      console.error("Telegram API error:", result.error)
      return NextResponse.json(
        { success: false, message: "Xatolik yuz berdi, iltimos qayta urinib ko'ring" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ success: false, message: "Server xatoligi" }, { status: 500 })
  }
}
