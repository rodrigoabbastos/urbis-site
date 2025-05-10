
// Import all necessary services and types
import { toast } from '@/components/ui/use-toast';
import { SiteContent, HeroContent, AboutContent, Service, MethodologyStep, ContactInfo } from './cms/types';
import { defaultContent } from './cms/defaultContent';
import { databaseService } from './cms/databaseService';
import { LinkedInPost } from '@/components/linkedin/types';
import { cmsService } from './cms/cmsService';

// Re-export everything from the CMS module
export * from './cms';

// Re-export the main CMS service instance
export { cmsService };

// Re-export types for convenience
export type {
  SiteContent,
  HeroContent,
  AboutContent,
  Service,
  MethodologyStep,
  ContactInfo,
  LinkedInPost
};
