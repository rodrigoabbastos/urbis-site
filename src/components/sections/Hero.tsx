import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { cmsService } from '@/services/cms';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { HeroContent } from '@/services/cms/types';

// Default fallback content
const DEFAULT_HERO_CONTENT: HeroContent = {
  title: 'URBIS: Inteligência e Desenvolvimento',
  subtitle: 'Soluções urbanísticas inovadoras para cidades inteligentes e sustentáveis',
  ctaText: 'Saiba Mais',
  ctaLink: '#about',
  backgroundImage: '/placeholder.svg'
};

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          console.warn('Supabase configuration is missing. Using default hero content.');
          setHeroContent(DEFAULT_HERO_CONTENT);
          setError(null);
          setIsLoading(false);
          return;
        }
        
        // Try to get content from CMS
        const content = await cmsService.getContent();
        
        if (content && content.hero) {
          setHeroContent(content.hero);
          setError(null);
        } else {
          console.warn('No hero content found in CMS, using defaults');
          // Keep using default content
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
        // Use default content but don't set error to avoid showing error UI
        console.warn('Using default hero content due to fetch error');
        // We already set default content in state initialization
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
  
  // Don't show error UI in Hero section, just use the default content
  // This ensures the website always looks good even if there are backend issues
  
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(242, 68, 119, 0.4), rgba(191, 54, 155, 0.5)), url(${heroContent.backgroundImage || DEFAULT_HERO_CONTENT.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-wrapper text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heroContent.title || DEFAULT_HERO_CONTENT.title}
          </h1>
          <p className="text-xl md:text-2xl mb-10">
            {heroContent.subtitle || DEFAULT_HERO_CONTENT.subtitle}
          </p>
          <a 
            href={heroContent.ctaLink || DEFAULT_HERO_CONTENT.ctaLink}
            className="inline-flex items-center bg-urbis-primary hover:bg-urbis-primary/90 text-white px-8 py-4 rounded-md text-lg font-medium transition-colors"
          >
            {heroContent.ctaText || DEFAULT_HERO_CONTENT.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
