import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface ContactScreenProps {
  onOpenWhatsApp: () => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como assistir às transmissões pelo WhatsApp?',
      answer: `Basta clicar em "Assistir Agora" em qualquer jogo ou chamar diretamente no WhatsApp ${WHATSAPP_DISPLAY_NUMBER}. O link direto da transmissão é enviado instantaneamente sem necessidade de cadastros complicados.`
    },
    {
      question: 'Quais campeonatos são transmitidos?',
      answer: 'Brasileirão Série A, Copa Libertadores, Copa do Brasil, Champions League e os principais campeonatos europeus.'
    },
    {
      question: 'As transmissões funcionam em Smart TV e Celular?',
      answer: 'Sim, os links diretos são compatíveis com qualquer navegador no celular, computador, tablet ou espelhamento em Smart TVs.'
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 sm:px-4 py-3 pb-24 gap-4">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display font-black text-xl text-white uppercase tracking-tight">
          WhatsApp Oficial
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Atendimento direto e suporte para transmissões de futebol ao vivo.
        </p>
      </div>

      {/* Main WhatsApp Card */}
      <div className="bg-[#191b23] border border-[#272a32] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-col gap-1">
          <span className="font-display text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
            WhatsApp Oficial
          </span>
          <h2 className="font-display font-black text-lg text-white uppercase">
            {WHATSAPP_DISPLAY_NUMBER}
          </h2>
          <p className="text-xs text-[#bbcabf]">
            Transmissões em alta definição liberadas sem travar.
          </p>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] py-3.5 px-6 rounded-xl font-display font-black text-xs uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Assistir Agora</span>
        </a>
      </div>

      {/* FAQ */}
      <div className="bg-[#191b23] rounded-2xl border border-[#272a32] p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-[#272a32] pb-3">
          <HelpCircle className="w-4 h-4 text-[#4edea3]" />
          <h3 className="font-display font-black text-sm text-white uppercase">
            Perguntas Frequentes
          </h3>
        </div>

        <div className="flex flex-col divide-y divide-[#272a32]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-2.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left flex items-center justify-between gap-2 font-display font-bold text-xs sm:text-sm text-white hover:text-[#4edea3] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#4edea3] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#bbcabf] shrink-0" />}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-[#bbcabf] leading-relaxed bg-[#0b0e15] p-3 rounded-xl border border-[#272a32]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
