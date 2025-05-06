
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
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
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-[#BF3B6C] mb-6">Envie uma mensagem</h3>
      
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#BF3B6C]"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#BF3B6C]"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#BF3B6C]"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#BF3B6C]"
            >
              <option value="">Selecione uma opção</option>
              <option value="Planejamento">Planejamento Urbano</option>
              <option value="Projeto">Projetos Urbanos</option>
              <option value="Consultoria">Consultoria Estratégica</option>
              <option value="Cidades">Cidades Inteligentes</option>
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
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#BF3B6C]"
          ></textarea>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#BF3B6C] text-white hover:bg-[#BF3B6C]/90 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>Enviando...</>
          ) : (
            <>Enviar Mensagem <Check className="w-4 h-4" /></>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
