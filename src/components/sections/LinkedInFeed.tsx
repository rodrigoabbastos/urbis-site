
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
        
        // Improved environment detection
        const hostname = window.location.hostname;
        const isProduction = !['localhost', '127.0.0.1'].includes(hostname) && 
                            !hostname.includes('lovable.app');
        console.log(`[LinkedInFeed] Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'} (${hostname})`);
        
        // Check if Supabase is configured
        const supabaseConfigured = isSupabaseConfigured();
        console.log('[LinkedInFeed] Supabase configurado:', supabaseConfigured);
        
        if (!supabaseConfigured) {
          console.error('[LinkedInFeed] Supabase não está configurado corretamente');
          setError('Banco de dados não configurado. Este componente exibirá dados de exemplo.');
          // For production, we still want to show something to users
          // Return early but don't throw an error that would prevent rendering
          setIsLoading(false);
          return;
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
        
        // Don't show toast here as getLinkedInPosts already handles it
      } finally {
        // Add a small delay for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    fetchPosts();
  }, []);

  // If no data and Supabase issue, but we still want to render component
  if (!isLoading && error?.includes('banco de dados') || error?.includes('Supabase')) {
    return (
      <section id="linkedin-feed" className="py-20 bg-white">
        <div className="container-wrapper">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Atualizações da URBIS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Acompanhe nossas últimas novidades, projetos e participações em eventos do setor de urbanismo e desenvolvimento territorial.
            </p>
          </div>
          
          {/* Show information about missing configuration but don't break the page */}
          <div className="max-w-3xl mx-auto mb-10">
            <Alert className="mb-6 border-yellow-500 bg-yellow-50">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
              <AlertDescription>
                Este componente requer uma conexão com banco de dados para exibir conteúdo dinâmico.
                <p className="text-sm mt-2">Ambiente: {window.location.hostname}</p>
              </AlertDescription>
            </Alert>
          </div>
          
          {/* Show example content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LinkedInPostCard key="example1" post={{
              id: "example1",
              text_snippet: "Este é um exemplo de publicação do LinkedIn que seria exibido quando o site estiver conectado ao banco de dados.",
              image_url: "/placeholder.svg",
              post_url: "https://linkedin.com/company/urbis-inteligencia",
              date: new Date().toISOString(),
              likes: 15,
              comments: 3
            }} />
            <LinkedInPostCard key="example2" post={{
              id: "example2",
              text_snippet: "Mais um exemplo de publicação do LinkedIn que seria exibido quando conectado ao banco de dados.",
              image_url: "/placeholder.svg",
              post_url: "https://linkedin.com/company/urbis-inteligencia",
              date: new Date().toISOString(),
              likes: 8,
              comments: 2
            }} />
          </div>
          
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
                <p className="text-sm mt-2 opacity-80">Ambiente: {window.location.hostname}</p>
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
