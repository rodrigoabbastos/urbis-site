
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import LinkedInPostCard from '../linkedin/LinkedInPostCard';
import LoadingState from '../linkedin/LoadingState';
import EmptyState from '../linkedin/EmptyState';
import { LinkedInPost } from '../linkedin/types';
import { getLinkedInPosts } from '../linkedin/linkedInData';

const LinkedInFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
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
