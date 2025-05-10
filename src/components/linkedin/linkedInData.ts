
import { LinkedInPost } from './types';
import { linkedInService } from '@/services/cms/linkedInService';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    // Use the linkedInService directly
    const posts = await linkedInService.getLinkedInPosts();
    console.log('LinkedIn posts fetched:', posts);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    return [];
  }
};
