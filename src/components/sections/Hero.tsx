
import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { HeroContent } from '@/services/cms/types';
import { Helmet } from 'react-helmet-async';

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    backgroundImage: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          throw new Error('Supabase configuration is missing. Please make sure your project is connected to Supabase.');
        }
        
        // Fetch hero content directly from Supabase
        const { data, error } = await supabase
          .from('content')
          .select('hero')
          .eq('id', 'main')
          .single();
          
        if (error) {
          console.error('Error fetching hero content:', error);
          throw new Error('Erro ao buscar conteúdo do Hero: ' + error.message);
        }
        
        if (data && data.hero) {
          console.log('Hero content loaded:', data.hero);
          // Fix type conversion with proper typecasting
          const heroData = data.hero as unknown as HeroContent;
          setHeroContent(heroData);
        } else {
          console.warn('No hero content found');
        }
        
        setError(null);
      } catch (error) {
        console.error('Error loading hero content:', error);
        setError('Não foi possível carregar o conteúdo. Verifique a conexão com o Supabase.');
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
  
  if (error) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="container-wrapper max-w-3xl">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <p className="text-center text-gray-600 mt-4">
            Acesse as configurações do projeto e conecte-o ao Supabase para continuar.
          </p>
        </div>
      </section>
    );
  }

  // Prepare FAQ structured data
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é um estudo de viabilidade urbanística?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Um estudo de viabilidade urbanística é uma análise técnica que avalia o potencial de desenvolvimento de uma área, considerando aspectos legais, ambientais e econômicos para verificar se um projeto de loteamento ou urbanização é viável."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona o processo de desenvolvimento de um loteamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O processo envolve análise da área, estudo de viabilidade, elaboração do projeto urbanístico, aprovação junto aos órgãos competentes, licenciamento ambiental, execução da infraestrutura e regularização fundiária."
        }
      },
      {
        "@type": "Question",
        "name": "Quais são os requisitos para aprovar um projeto de loteamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os requisitos incluem conformidade com o plano diretor municipal, respeito às áreas de preservação ambiental, porcentagem mínima de áreas públicas, projeto de drenagem, abastecimento de água, esgotamento sanitário e outros aspectos técnicos específicos da legislação local."
        }
      }
    ]
  };
  
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(242, 68, 119, 0.4), rgba(191, 54, 155, 0.5)), url(${heroContent.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Helmet>
        <title>Urbis - Inteligência em Desenvolvimento Urbano e Loteamentos</title>
        <meta name="description" content="Soluções completas em urbanismo, loteamentos, projetos e viabilidade técnica para bairros planejados e desenvolvimento urbano sustentável" />
        <meta name="keywords" content="loteamento, urbanismo, projeto urbanístico, viabilidade técnica, bairro planejado, planejamento urbano, meio ambiente" />
      </Helmet>

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

      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </section>
  );
};

export default Hero;
