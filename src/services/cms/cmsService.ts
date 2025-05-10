
import { SiteContent } from './types';
import { defaultContent } from './defaultContent';
import { BaseCMSService } from './core/baseCmsService';
import { heroService } from './sections/heroService';
import { aboutService } from './sections/aboutService';
import { servicesService } from './sections/servicesService';
import { methodologyService } from './sections/methodologyService';
import { contactService } from './sections/contactService';
import { linkedInService } from './linkedInService';
import { projectService } from './projectService';

class CMSService extends BaseCMSService {
  // Hero section methods
  updateHero = heroService.updateHero.bind(heroService);
  
  // About section methods
  updateAbout = aboutService.updateAbout.bind(aboutService);
  
  // Services section methods
  updateService = servicesService.updateService.bind(servicesService);
  deleteService = servicesService.deleteService.bind(servicesService);
  
  // Methodology section methods
  updateMethodology = methodologyService.updateMethodology.bind(methodologyService);
  updateMethodologyStep = methodologyService.updateMethodologyStep.bind(methodologyService);
  deleteMethodologyStep = methodologyService.deleteMethodologyStep.bind(methodologyService);
  
  // Projects section methods
  updateProjects = projectService.updateProjects.bind(projectService);
  updateProject = projectService.updateProject.bind(projectService);
  deleteProject = projectService.deleteProject.bind(projectService);
  
  // Contact section methods
  updateContactInfo = contactService.updateContactInfo.bind(contactService);
  
  // LinkedIn posts methods
  updateLinkedInPost = linkedInService.updateLinkedInPost.bind(linkedInService);
  deleteLinkedInPost = linkedInService.deleteLinkedInPost.bind(linkedInService);
  getLinkedInPosts = linkedInService.getLinkedInPosts.bind(linkedInService);
}

// Create an instance and export it
export const cmsService = new CMSService();
