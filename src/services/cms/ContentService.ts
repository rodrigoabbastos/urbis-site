
import { HeroContent, AboutContent, ContactInfo, MethodologyStep } from './types';
import { BaseService } from './BaseService';
import { heroService } from './content/HeroService';
import { aboutService } from './content/AboutService';
import { methodologyService } from './content/MethodologyService';
import { contactService } from './content/ContactService';

export class ContentService extends BaseService {
  // Delegate to specialized services
  async updateHero(hero: HeroContent): Promise<void> {
    return heroService.updateHero(hero);
  }
  
  async updateAbout(about: AboutContent): Promise<void> {
    return aboutService.updateAbout(about);
  }
  
  async updateMethodology(methodology: { title: string; description: string; steps: MethodologyStep[] }): Promise<void> {
    return methodologyService.updateMethodology(methodology);
  }
  
  async updateMethodologyStep(step: MethodologyStep): Promise<void> {
    return methodologyService.updateMethodologyStep(step);
  }
  
  async deleteMethodologyStep(id: string): Promise<void> {
    return methodologyService.deleteMethodologyStep(id);
  }
  
  async updateContactInfo(contact: ContactInfo): Promise<void> {
    return contactService.updateContactInfo(contact);
  }
}

export const contentService = new ContentService();
