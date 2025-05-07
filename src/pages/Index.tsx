
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Methodology from '@/components/sections/Methodology';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import LinkedInFeed from '@/components/sections/LinkedInFeed';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Methodology />
        <Projects />
        <LinkedInFeed />
        <Testimonials />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
