
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
        duration: 5000,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-urbis-lightGray">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-navy mb-4">
            Entre em Contato
          </h2>
          <p className="text-urbis-darkGray max-w-3xl mx-auto">
            Estamos aqui para responder suas perguntas e ajudá-lo em sua jornada imobiliária. Entre em contato conosco hoje mesmo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-urbis-navy mb-6">Envie uma mensagem</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-urbis-darkGray mb-2 text-sm">
                    Nome completo*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-urbis-navy"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-urbis-darkGray mb-2 text-sm">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-urbis-navy"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-urbis-darkGray mb-2 text-sm">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-urbis-navy"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-urbis-darkGray mb-2 text-sm">
                    Assunto*
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-urbis-navy"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Compra">Compra de imóvel</option>
                    <option value="Venda">Venda de imóvel</option>
                    <option value="Locação">Locação de imóvel</option>
                    <option value="Administração">Administração de imóvel</option>
                    <option value="Avaliação">Avaliação imobiliária</option>
                    <option value="Outro">Outro assunto</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-urbis-darkGray mb-2 text-sm">
                  Mensagem*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-urbis-navy"
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-urbis-navy text-white hover:bg-urbis-navy/90 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>Enviar Mensagem <Check className="w-4 h-4" /></>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-urbis-navy p-6 md:p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-urbis-blue mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Endereço</h4>
                    <p className="text-gray-300">
                      Av. Paulista, 1000 - Bela Vista<br />
                      São Paulo - SP, 01310-100
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-urbis-blue mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Telefone</h4>
                    <p className="text-gray-300">
                      +55 (11) 9999-9999<br />
                      +55 (11) 3333-3333
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-urbis-blue mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-1">E-mail</h4>
                    <p className="text-gray-300">
                      contato@urbis.com.br<br />
                      comercial@urbis.com.br
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-urbis-blue mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Horário de Atendimento</h4>
                    <p className="text-gray-300">
                      Segunda à Sexta: 9h às 18h<br />
                      Sábados: 9h às 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.098371865046!2d-46.65390548502158!3d-23.563403384681576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1651500862252!5m2!1spt-BR!2sbr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Urbis Location"
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
