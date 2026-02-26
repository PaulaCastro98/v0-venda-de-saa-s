const WHATSAPP_NUMBER = "5511999999999" // Altere para seu numero

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export function buildPlanMessage(plan: string, userData?: { name: string; email: string; phone: string; company?: string }) {
  let msg = `Ola! Tenho interesse no plano *${plan}* da SimpleWork.`
  if (userData) {
    msg += `\n\nMeus dados:\nNome: ${userData.name}\nEmail: ${userData.email}\nTelefone: ${userData.phone}`
    if (userData.company) msg += `\nEmpresa: ${userData.company}`
  }
  return msg
}

export function buildProductMessage(productName: string) {
  return `Ola! Gostaria de saber mais sobre o sistema *${productName}* da SimpleWork.`
}
