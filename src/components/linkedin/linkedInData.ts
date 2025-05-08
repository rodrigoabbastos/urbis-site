
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cmsService';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  return await cmsService.getLinkedInPosts();
};
