
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#BF3B6C] text-white pt-16 pb-6">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">URBIS</h3>
            <p className="text-gray-200 mb-4">
              Soluções inovadoras em planejamento urbano e desenvolvimento de cidades inteligentes, focadas em sustentabilidade e qualidade de vida.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/urbisplanejamento" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/urbisplanejamento" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/urbisplanejamento" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-200 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-200 hover:text-white transition-colors">
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-200 hover:text-white transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-200 hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-200 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-200 hover:text-white transition-colors">
                  Planejamento Urbano
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-200 hover:text-white transition-colors">
                  Projetos Urbanos
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-200 hover:text-white transition-colors">
                  Consultoria Estratégica
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-200 hover:text-white transition-colors">
                  Cidades Inteligentes
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-200 hover:text-white transition-colors">
                  Sustentabilidade Urbana
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <a href="https://maps.google.com/?q=Rua Dr. Orlando Feirabend Filho, 230 - sala 701 C, São José dos Campos-SP" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors">
                  Rua Dr. Orlando Feirabend Filho, 230 - sala 701 C<br />
                  Centro Empresarial Aquarius - São José dos Campos-SP
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-white flex-shrink-0" />
                <a href="tel:+5512992031890" className="text-gray-200 hover:text-white transition-colors">
                  (12) 99203-1890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-white flex-shrink-0" />
                <a href="mailto:contato@urbis.com.br" className="text-gray-200 hover:text-white transition-colors">
                  contato@urbis.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-6">
          <p className="text-center text-gray-200 text-sm">
            &copy; {currentYear} Urbis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
