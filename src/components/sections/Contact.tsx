
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import LocationMap from '@/components/contact/LocationMap';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-[#919494]/10">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#BF3B6C] mb-4">
            Entre em Contato
          </h2>
          <p className="text-urbis-darkGray max-w-3xl mx-auto">
            Estamos prontos para ajudar a transformar sua visão em realidade. Entre em contato para discutir seu projeto ou obter mais informações sobre nossos serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info and Map */}
          <div>
            <ContactInfo />
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
