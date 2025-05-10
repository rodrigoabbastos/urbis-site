
import { SiteContent } from '../types';
import { LinkedInPost } from '@/components/linkedin/types';

export interface DatabaseServiceInterface {
  createTablesIfNotExist(): Promise<void>;
  
  // Content methods
  fetchMainContent(): Promise<any | null>;
  fetchProjectsInfo(): Promise<any | null>;
  saveMainContent(content: {
    hero: any;
    about: any;
    services: any;
    methodology: any;
    contact: any;
  }): Promise<boolean>;
  saveProjectsInfo(projectsInfo: { title: string; description: string }): Promise<boolean>;
  
  // Projects methods
  fetchProjects(): Promise<any[] | null>;
  saveProject(project: any): Promise<boolean>;
  deleteProject(id: string): Promise<boolean>;
  
  // LinkedIn posts methods
  fetchLinkedInPosts(): Promise<any[] | null>;
  saveLinkedInPost(post: any): Promise<boolean>;
  deleteLinkedInPost(id: string): Promise<boolean>;
  
  // Migration and reset methods
  migrateFromLocalStorage(localContent: SiteContent, storageKey: string): Promise<boolean>;
  resetToDefault(defaultData: SiteContent): Promise<boolean>;
}
