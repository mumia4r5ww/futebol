/**
 * WhatsApp integration utility
 * WhatsApp: 11-99388-1626
 */

export const WHATSAPP_DISPLAY_NUMBER = '(11) 99388-1626';
export const WHATSAPP_RAW_NUMBER = '5511993881626';

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
