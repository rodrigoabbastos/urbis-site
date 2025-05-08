
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cmsService, HeroContent } from '@/services/cmsService';

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    backgroundImage: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await cmsService.getContent();
        setHeroContent(content.hero);
      } catch (error) {
        console.error('Error loading hero content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  if (isLoading) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-gray-600">Carregando...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroContent.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-wrapper text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{heroContent.title}</h1>
          <p className="text-xl md:text-2xl mb-10">
            {heroContent.subtitle}
          </p>
          <a 
            href={heroContent.ctaLink} 
            className="inline-flex items-center bg-urbis-primary hover:bg-urbis-primary/90 text-white px-8 py-4 rounded-md text-lg font-medium transition-colors"
          >
            {heroContent.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
