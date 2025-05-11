
import { MessageCircleMore } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { cmsService } from '@/services/cms/cmsService';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("5512992031890"); // Default number
  const message = "Olá! Gostaria de mais informações sobre os serviços da Urbis.";
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    // Load whatsapp number from CMS
    const loadWhatsappNumber = async () => {
      try {
        const content = await cmsService.getContent();
        if (content?.contact?.whatsapp) {
          setWhatsappNumber(content.contact.whatsapp);
        }
      } catch (error) {
        console.error('Failed to load whatsapp number:', error);
      }
    };
    
    loadWhatsappNumber();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed right-5 bottom-5 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircleMore size={28} />
    </a>
  );
};

export default WhatsAppButton;
