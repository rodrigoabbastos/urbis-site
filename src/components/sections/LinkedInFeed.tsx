
import React, { useState, useEffect } from 'react';
import { getLinkedInPosts } from '../linkedin/linkedInData';
import { LinkedInPost } from '../linkedin/types';
import LinkedInPostCard from '../linkedin/LinkedInPostCard';
import LoadingState from '../linkedin/LoadingState';
import EmptyState from '../linkedin/EmptyState';

const LinkedInFeed = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getLinkedInPosts();
        console.log('LinkedIn posts in component:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="linkedin" className="py-16 bg-white">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">URBIS no LinkedIn</h2>
          <p className="text-gray-600">
            Acompanhe nossas últimas publicações e atualizações no LinkedIn
          </p>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <LinkedInPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        <div className="text-center mt-10">
          <a
            href="https://www.linkedin.com/company/urbis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Siga-nos no LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default LinkedInFeed;
