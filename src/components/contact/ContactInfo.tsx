
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-[#D94848] p-6 md:p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-semibold text-white mb-6">Informações de Contato</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-white mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-1">Endereço</h4>
            <p className="text-gray-200">
              Rua Dr. Orlando Feirabend Filho, 230 - sala 701 C<br />
              Centro Empresarial Aquarius - São José dos Campos-SP
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-6 w-6 text-white mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-1">Telefone</h4>
            <p className="text-gray-200">
              (12) 99203-1890
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-6 w-6 text-white mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-1">E-mail</h4>
            <p className="text-gray-200">
              contato@urbis.com.br
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
