
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertCircle } from 'lucide-react';
import LinkedInPostCard from '../linkedin/LinkedInPostCard';
import LoadingState from '../linkedin/LoadingState';
import EmptyState from '../linkedin/EmptyState';
import { LinkedInPost } from '../linkedin/types';
import { getLinkedInPosts } from '../linkedin/linkedInData';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

const LinkedInFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Verifica ambiente
        const isProduction = window.location.hostname === 'urbis.com.br';
        console.log(`[LinkedInFeed] Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
        
        // Check if Supabase is configured
        const supabaseConfigured = isSupabaseConfigured();
        console.log('[LinkedInFeed] Supabase configurado:', supabaseConfigured);
        
        if (!supabaseConfigured) {
          console.error('[LinkedInFeed] Supabase não está configurado corretamente');
          throw new Error('Supabase não está configurado corretamente. Por favor, verifique sua conexão com o banco de dados.');
        }
        
        console.log('[LinkedInFeed] Buscando posts do LinkedIn...');
        const fetchedPosts = await getLinkedInPosts();
        
        if (fetchedPosts.length === 0) {
          console.log('[LinkedInFeed] Nenhum post encontrado, mas não é um erro');
        } else {
          console.log(`[LinkedInFeed] ${fetchedPosts.length} posts encontrados`);
        }
        
        setPosts(fetchedPosts);
      } catch (err: any) {
        console.error('[LinkedInFeed] Erro ao buscar posts do LinkedIn:', err);
        setError(err?.message || 'Não foi possível carregar as publicações.');
        
        toast({
          title: "Erro",
          description: "Não foi possível carregar as publicações do LinkedIn.",
          variant: "destructive",
        });
      } finally {
        // Add a small delay for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    fetchPosts();
  }, []);

  if (error && error.includes('Supabase')) {
    return (
      <section id="linkedin-feed" className="py-20 bg-white">
        <div className="container-wrapper">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Atualizações da URBIS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Acompanhe nossas últimas novidades, projetos e participações em eventos do setor de urbanismo e desenvolvimento territorial.
            </p>
          </div>
          
          <Alert variant="destructive" className="mb-6 max-w-3xl mx-auto">
            <AlertCircle className="h-5 w-5 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section id="linkedin-feed" className="py-20 bg-white">
      <div className="container-wrapper">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Atualizações da URBIS</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Acompanhe nossas últimas novidades, projetos e participações em eventos do setor de urbanismo e desenvolvimento territorial.
          </p>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-5 w-5 mr-2" />
              <AlertDescription>
                {error}
                <p className="text-sm mt-2 opacity-80">[Ambiente: {window.location.hostname}]</p>
              </AlertDescription>
            </Alert>
            <EmptyState />
          </div>
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <LinkedInPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild className="bg-[#0A66C2] hover:bg-[#0A66C2]/90">
            <a 
              href="https://www.linkedin.com/company/urbis-inteligencia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Ver Mais no LinkedIn
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LinkedInFeed;
