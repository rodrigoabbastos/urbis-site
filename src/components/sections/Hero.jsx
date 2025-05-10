
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cmsService } from '@/services/cmsService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Urbis Inteligência Territorial",
    subtitle: "Soluções inteligentes para desenvolvimento urbano, planejamento territorial e gestão de cidades.",
    ctaText: "Conheça Nossos Serviços",
    ctaUrl: "#services",
    backgroundImage: ""
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        
        // Verificar se Supabase está configurado
        if (!isSupabaseConfigured()) {
          console.warn('Supabase não está configurado. Usando dados padrão do hero.');
          setIsLoading(false);
          return;
        }
        
        console.log('Buscando dados do Hero do CMS...');
        const content = await cmsService.getContent();
        console.log('Dados do CMS recebidos:', content);
        
        if (content && content.hero) {
          console.log('Dados do Hero encontrados:', content.hero);
          setHeroData(content.hero);
        } else {
          console.warn('Dados do Hero não encontrados no CMS. Usando dados padrão.');
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Hero:", error);
        setError("Não foi possível carregar os dados do banner principal.");
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center bg-sky-900">
        <div className="text-white text-center">
          <p className="text-xl">Carregando...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="hero" 
      style={heroStyle}
      className="relative min-h-[90vh] flex items-center justify-center text-white py-20 px-4"
    >
      <div className="absolute inset-0 bg-black/30" />
      
      {error && (
        <Alert variant="destructive" className="absolute top-4 right-4 max-w-md">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
          <a href={heroData.ctaUrl || "#services"}>
            {heroData.ctaText}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
