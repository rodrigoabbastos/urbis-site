
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cmsService';

export const getLinkedInPosts = (): LinkedInPost[] => {
  return cmsService.getLinkedInPosts();
};
