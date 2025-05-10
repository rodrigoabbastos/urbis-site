
import React from 'react';
import { Button } from '@/components/ui/button';
import { cmsService } from '@/services/cmsService';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Urbis Inteligência Territorial",
    subtitle: "Soluções inteligentes para desenvolvimento urbano, planejamento territorial e gestão de cidades.",
    ctaText: "Conheça Nossos Serviços",
    ctaUrl: "#services",
    backgroundImage: ""
  });
  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const content = await cmsService.getContent();
        if (content && content.hero) {
          setHeroData(content.hero);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    
    fetchHeroData();
  }, []);

  const heroStyle = {
    backgroundImage: heroData.backgroundImage ? 
      `linear-gradient(rgba(12, 74, 110, 0.85), rgba(12, 74, 110, 0.85)), url(${heroData.backgroundImage})` : 
      'linear-gradient(90deg, rgba(12, 74, 110, 1) 0%, rgba(25, 120, 160, 1) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section 
      id="hero" 
      style={heroStyle}
      className="relative min-h-[90vh] flex items-center justify-center text-white py-20 px-4"
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container mx-auto relative z-10 max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {heroData.title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          {heroData.subtitle}
        </p>
        
        <Button 
          size="lg"
          asChild
          className="bg-urbis-secondary hover:bg-urbis-secondary/90 text-white px-8 py-3 rounded-full text-lg"
        >
          <a href={heroData.ctaUrl}>
            {heroData.ctaText}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
