
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    const posts = await cmsService.getLinkedInPosts();
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    return [];
  }
};
