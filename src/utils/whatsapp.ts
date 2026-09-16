/**
 * WhatsApp integration utility
 * WhatsApp: +55 (11) 94046-8086
 */

export const WHATSAPP_DISPLAY_NUMBER = '+55 (11) 94046-8086';
export const WHATSAPP_RAW_NUMBER = '5511940468086';

export const getWhatsAppLink = (matchText?: string) => {
  const text = matchText 
    ? `Olá, quero assistir ${matchText} ao vivo!`
    : 'Olá, quero assistir aos jogos ao vivo!';
  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const openWhatsApp = (matchText?: string) => {
  const url = getWhatsAppLink(matchText);
  window.open(url, '_blank', 'noopener,noreferrer');
};
