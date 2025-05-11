
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
  link?: string;
  keywords?: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
}

export interface ClientLogo {
  id: string;
  image: string;
  name: string;
  order: number;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  clients: boolean;
  services: boolean;
  methodology: boolean;
  projects: boolean;
  linkedin: boolean;
  testimonials: boolean;
  contact: boolean;
  ebooks: boolean;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
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
  clients: {
    title: string;
    description: string;
    logos: ClientLogo[];
  };
  sectionVisibility: SectionVisibility;
  ebooks: {
    title: string;
    description: string;
    items: Ebook[];
  };
}
