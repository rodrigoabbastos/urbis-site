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
import { supabase } from '@/lib/supabase';

const LinkedInFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          throw new Error('Supabase configuration is missing. Please make sure your project is connected to Supabase.');
        }
        
        // First ensure tables exist
        try {
          // Use type assertion to bypass TypeScript checking for RPC calls
          await (supabase.rpc('table_exists', { table_name: 'linkedin_posts' }) as any);
        } catch (err) {
          console.error('Error checking table existence:', err);
        }
        
        const fetchedPosts = await getLinkedInPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching LinkedIn posts:', err);
        setError('Não foi possível carregar as publicações.');
      } finally {
        // Add a small delay for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    fetchPosts();
  }, []);

  if (error && error.includes('Supabase configuration is missing')) {
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
            <AlertDescription>Configuração do Supabase ausente. Conecte o projeto ao Supabase para carregar as atualizações.</AlertDescription>
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
          <EmptyState />
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
