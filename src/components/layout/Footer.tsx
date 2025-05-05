
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-urbis-navy text-white pt-16 pb-6">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">URBIS</h3>
            <p className="text-gray-300 mb-4">
              Soluções imobiliárias completas para você ou sua empresa, com foco em resultados e satisfação do cliente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-urbis-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-urbis-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-urbis-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a href="#properties" className="text-gray-300 hover:text-white transition-colors">
                  Imóveis
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Compra e Venda</li>
              <li className="text-gray-300">Locação</li>
              <li className="text-gray-300">Administração de Imóveis</li>
              <li className="text-gray-300">Avaliação Imobiliária</li>
              <li className="text-gray-300">Consultoria Jurídica</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-urbis-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-urbis-blue flex-shrink-0" />
                <a href="tel:+551199999999" className="text-gray-300 hover:text-white transition-colors">
                  +55 (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-urbis-blue flex-shrink-0" />
                <a href="mailto:contato@urbis.com.br" className="text-gray-300 hover:text-white transition-colors">
                  contato@urbis.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} Urbis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
