
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, MessageSquare, ThumbsUp, Share } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Define interface for LinkedIn post data
interface LinkedInPost {
  id: string;
  text_snippet: string;
  image_url?: string;
  post_url: string;
  date: string;
  likes: number;
  comments: number;
}

// Sample data for demonstration (until API integration)
const samplePosts: LinkedInPost[] = [
  {
    id: '1',
    text_snippet: 'Finalizamos mais um estudo de viabilidade para um loteamento de alto padrão na região de São José dos Campos. Grandes projetos começam com análises técnicas detalhadas.',
    image_url: '/images/projects/project1.jpg',
    post_url: 'https://www.linkedin.com/company/urbis-inteligencia',
    date: new Date(2024, 4, 2).toISOString(),
    likes: 45,
    comments: 7,
  },
  {
    id: '2',
    text_snippet: 'Nossa equipe participou do workshop sobre novas regulamentações ambientais para empreendimentos urbanos. Conhecimento técnico faz toda a diferença na aprovação de projetos.',
    post_url: 'https://www.linkedin.com/company/urbis-inteligencia',
    date: new Date(2024, 3, 25).toISOString(),
    likes: 32,
    comments: 5,
  },
  {
    id: '3',
    text_snippet: 'Comemorando a aprovação de mais um projeto de loteamento! Mais de 300 lotes aprovados após um intenso trabalho de adequação à legislação municipal e ambiental.',
    image_url: '/images/projects/project2.jpg',
    post_url: 'https://www.linkedin.com/company/urbis-inteligencia',
    date: new Date(2024, 3, 18).toISOString(),
    likes: 78,
    comments: 13,
  },
];

// Component to show when there are no posts
const EmptyState = () => {
  return (
    <div className="text-center py-16 px-4 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Em breve novidades do nosso LinkedIn aqui.</h3>
      <p className="text-gray-600">
        Enquanto isso, visite nossa página no LinkedIn para acompanhar nossas atualizações.
      </p>
      <Button asChild className="mt-4 bg-[#0A66C2] hover:bg-[#0A66C2]/90">
        <a href="https://www.linkedin.com/company/urbis-inteligencia" target="_blank" rel="noopener noreferrer">
          Visitar LinkedIn
        </a>
      </Button>
    </div>
  );
};

// Component for loading state
const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={`loading-${i}`} className="overflow-hidden h-full">
          <CardHeader className="pb-0">
            <Skeleton className="h-4 w-32 mb-2" />
          </CardHeader>
          <CardContent className="py-4">
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

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
        
        // For demo purposes, use sample data
        // In production, this would be an API call to Supabase or similar
        setPosts(samplePosts);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch LinkedIn posts", err);
        setError("Não foi possível carregar as postagens do LinkedIn");
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data não disponível';
    }
  };

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
              <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                <CardHeader className="pb-0">
                  <div className="text-sm text-gray-500">
                    {formatDate(post.date)}
                  </div>
                </CardHeader>
                <CardContent className="py-4 flex-grow">
                  <p className="text-gray-700 mb-4">{post.text_snippet}</p>
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden rounded-md mb-4">
                      <img
                        src={post.image_url}
                        alt="Imagem da postagem LinkedIn"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
                  >
                    <a 
                      href={post.post_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <span>Ver no LinkedIn</span>
                      <Share className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
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
