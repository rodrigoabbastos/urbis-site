
import TestimonialCard from '@/components/ui/TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Secretaria de Desenvolvimento Urbano",
      role: "Cliente Governamental",
      content: "A equipe da Urbis foi essencial para o desenvolvimento do nosso plano diretor. Sua metodologia inovadora e participativa garantiu que as necessidades da população fossem ouvidas e incorporadas ao projeto.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Instituto de Planejamento Regional",
      role: "Parceiro Institucional",
      content: "Nossa parceria com a Urbis resultou em projetos transformadores para a região. A capacidade técnica e o comprometimento da equipe fazem toda a diferença nos resultados entregues.",
      rating: 5,
    },
    {
      name: "Construtora Horizonte",
      role: "Cliente Corporativo",
      content: "Contamos com a Urbis para os estudos de viabilidade e planejamento urbano dos nossos empreendimentos. Sua abordagem sustentável e inovadora agregou valor significativo aos nossos projetos.",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-[#BF369B] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-wrapper relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto">
            A excelência técnica e o comprometimento com resultados são valores essenciais da Urbis, reconhecidos por nossos clientes e parceiros.
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
