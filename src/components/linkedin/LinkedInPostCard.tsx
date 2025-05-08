
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Share, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LinkedInPost } from './types';

interface LinkedInPostCardProps {
  post: LinkedInPost;
}

const LinkedInPostCard: React.FC<LinkedInPostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data não disponível';
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Get a shorter snippet of text for collapsed view
  const getDisplayText = () => {
    if (isExpanded) {
      return post.text_snippet;
    }
    
    // Truncate to approximately 100 characters or 3 lines
    if (post.text_snippet.length > 120) {
      return post.text_snippet.substring(0, 120) + '...';
    }
    
    return post.text_snippet;
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Linkedin className="h-5 w-5 text-[#0A66C2]" />
          <span>URBIS Inteligência Territorial</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {formatDate(post.date)}
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-grow">
        <div className="mb-4">
          <p className="text-gray-700">{getDisplayText()}</p>
          {post.text_snippet.length > 120 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleExpand}
              className="mt-1 p-1 h-auto text-[#0A66C2] hover:text-[#0A66C2]/80 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Mostrar menos <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Leia mais <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
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
  );
};

export default LinkedInPostCard;
