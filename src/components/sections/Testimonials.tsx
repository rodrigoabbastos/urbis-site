
import TestimonialCard from '@/components/ui/TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Roberto Silva",
      role: "Proprietário",
      content: "A equipe da Urbis foi excepcional durante todo o processo de venda do meu apartamento. Profissionais, transparentes e eficientes. Conseguiram vender meu imóvel em tempo recorde e pelo valor que eu esperava.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Carla Mendes",
      role: "Compradora",
      content: "Minha experiência com a Urbis foi maravilhosa! Meu corretor entendeu exatamente o que eu estava procurando e me mostrou opções perfeitas. O processo de compra foi tranquilo e sem complicações.",
      rating: 5,
    },
    {
      name: "Empresa ABC Ltda.",
      role: "Cliente Corporativo",
      content: "Contamos com a Urbis para encontrar o espaço ideal para nossa nova sede. Eles não só encontraram o imóvel perfeito, mas também negociaram excelentes condições e nos apoiaram em todo o processo legal.",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-urbis-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-urbis-blue/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-urbis-blue/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-wrapper relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            A satisfação de nossos clientes é nossa maior prioridade. Veja o que eles têm a dizer sobre nossas soluções imobiliárias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
