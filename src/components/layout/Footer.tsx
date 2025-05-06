
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
              Soluções inovadoras em planejamento urbano e desenvolvimento de cidades inteligentes, focadas em sustentabilidade e qualidade de vida.
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
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  Projetos
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
              <li className="text-gray-300">Planejamento Urbano</li>
              <li className="text-gray-300">Projetos Urbanos</li>
              <li className="text-gray-300">Consultoria Estratégica</li>
              <li className="text-gray-300">Cidades Inteligentes</li>
              <li className="text-gray-300">Sustentabilidade Urbana</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-urbis-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Rua Dr. Orlando Feirabend Filho, 230 - sala 701 C<br />
                  Centro Empresarial Aquarius - São José dos Campos-SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-urbis-blue flex-shrink-0" />
                <a href="tel:+5512992031890" className="text-gray-300 hover:text-white transition-colors">
                  (12) 99203-1890
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
