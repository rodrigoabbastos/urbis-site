
import { MapPin, Phone, Mail, Clock, MessageCircleMore } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cmsService } from '@/services/cms/cmsService';
import { ContactInfo as ContactInfoType } from '@/services/cms/types';

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoType>({
    email: 'contato@urbis.com.br',
    phone: '(12) 99203-1890',
    whatsapp: '5512992031890',
    address: 'Rua Dr. Orlando Feirabend Filho, 230 - sala 701 C, Centro Empresarial Aquarius - São José dos Campos-SP',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3088907774326!2d-45.89147562471978!3d-23.19989304897518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4a154915d207%3A0xf11b32196b25eff2!2sR.%20Dr.%20Orlando%20Feirabend%20Filho%2C%20230%20-%20Jardim%20Aquarius%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012246-190!5e0!3m2!1spt-BR!2sbr!4v1714768038776!5m2!1spt-BR!2sbr'
  });

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const content = await cmsService.getContent();
        if (content?.contact) {
          setContactInfo(content.contact);
        }
      } catch (error) {
        console.error('Failed to load contact info:', error);
      }
    };
    
    loadContactInfo();
  }, []);

  const formatPhone = (phone: string) => {
    return phone.replace(/[^\d+]/g, '');
  };

  const getWhatsappLink = () => {
    // Use the whatsapp field if available, otherwise format the phone number
    const whatsappNumber = contactInfo.whatsapp || formatPhone(contactInfo.phone);
    const message = "Olá! Gostaria de mais informações sobre os serviços da Urbis.";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-[#D94848] p-6 md:p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-semibold text-white mb-6">Informações de Contato</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-white mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-1">Endereço</h4>
            <p className="text-gray-200">
              {contactInfo.address}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="min-w-[24px] mt-1 mr-4">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Telefone</h4>
            <div className="flex items-center space-x-2">
              <p className="text-gray-200">
                {contactInfo.phone}
              </p>
              <a 
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] text-white p-1 rounded-full hover:bg-[#1da851] transition-colors"
                aria-label="Contato via WhatsApp"
                title="Conversar pelo WhatsApp"
              >
                <MessageCircleMore size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-6 w-6 text-white mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-1">E-mail</h4>
            <p className="text-gray-200">
              {contactInfo.email}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-6 w-6 text-white mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-1">Horário de Atendimento</h4>
            <p className="text-gray-200">
              Segunda à Sexta: 9h às 18h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
