
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms/cmsService';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    return await cmsService.getLinkedInPosts();
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    return [];
  }
};
