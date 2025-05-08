
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import LinkedInPostCard from '../linkedin/LinkedInPostCard';
import LoadingState from '../linkedin/LoadingState';
import EmptyState from '../linkedin/EmptyState';
import { LinkedInPost } from '../linkedin/types';
import { urbisLinkedInPosts } from '../linkedin/linkedInData';

const LinkedInFeed = () => {
  const [posts, setPosts] = React.useState<LinkedInPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // This would be replaced with actual API call in production
    const fetchPosts = async () => {
      try {
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, use our Urbis LinkedIn content
        // In production, this would be an API call to LinkedIn API or similar
        setPosts(urbisLinkedInPosts);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch LinkedIn posts", err);
        setError("Não foi possível carregar as postagens do LinkedIn");
        setIsLoading(false);
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
