export async function sendTelegramMessage(token: string, chatId: string, message: string) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return { success: false, error }
  }
}

export function formatOrderMessage(formData: {
  name: string
  phone: string
  package: string
  region?: string
}) {
  const now = new Date()
  const formattedDate = now.toLocaleDateString("uz-UZ")
  const formattedTime = now.toLocaleTimeString("uz-UZ")

  return `
🛒 <b>YANGI BUYURTMA!</b>

👤 <b>Ism:</b> ${formData.name}
📞 <b>Telefon:</b> ${formData.phone}
📦 <b>Mahsulot:</b> ${formData.package}
${formData.region ? `📍 <b>Viloyat:</b> ${formData.region}` : ""}
⏰ <b>Vaqt:</b> ${formattedDate} ${formattedTime}

💰 <b>Narx:</b> ${formData.package === "10 kunlik" ? "500,000" : "700,000"} so'm
`
}
