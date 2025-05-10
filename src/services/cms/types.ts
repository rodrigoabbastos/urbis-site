
import { LucideIcon } from 'lucide-react';
import { LinkedInPost } from '@/components/linkedin/types';

// Types for our CMS content
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface AboutContent {
  title: string;
  description: string[];
  features: string[];
  image: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
}

export interface MethodologyStep {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  client: string;
  year: string;
  type: 'urban' | 'smart' | string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  methodology: {
    title: string;
    description: string;
    steps: MethodologyStep[];
  };
  projects: {
    title: string;
    description: string;
    items: Project[];
  };
  contact: ContactInfo;
  linkedInPosts: LinkedInPost[];
}
