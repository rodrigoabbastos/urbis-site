
import { SiteContent } from '../types';
import { DatabaseServiceInterface } from './DatabaseServiceInterface';
import { createTablesIfNotExist } from './tableInitializer';
import { 
  fetchMainContent, fetchProjectsInfo, saveContent, saveProjectsInfo 
} from './contentRepository';
import { fetchProjects, saveProject, deleteProject } from './projectsRepository';
import { fetchLinkedInPosts, saveLinkedInPost, deleteLinkedInPost } from './linkedInRepository';
import { migrateFromLocalStorage, resetToDefault } from './migrationHelper';

export class DatabaseService implements DatabaseServiceInterface {
  async createTablesIfNotExist(): Promise<void> {
    await createTablesIfNotExist();
  }
  
  // Content methods
  async fetchMainContent() {
    return fetchMainContent();
  }
  
  async fetchProjectsInfo() {
    return fetchProjectsInfo();
  }
  
  async saveMainContent(content: {
    hero: any;
    about: any;
    services: any;
    methodology: any;
    contact: any;
    clients?: any;
    sectionVisibility?: any;
    ebooks?: any;
  }) {
    console.log('DatabaseService.saveMainContent: Salvando conteúdo principal', {
      clients: content.clients ? 'presente' : 'ausente',
      sectionVisibility: content.sectionVisibility ? 'presente' : 'ausente',
      ebooks: content.ebooks ? 'presente' : 'ausente'
    });
    
    return saveContent(content);
  }
  
  async saveProjectsInfo(projectsInfo: { title: string; description: string }) {
    return saveProjectsInfo(projectsInfo);
  }
  
  // Projects methods
  async fetchProjects() {
    return fetchProjects();
  }
  
  async saveProject(project: any) {
    return saveProject(project);
  }
  
  async deleteProject(id: string) {
    return deleteProject(id);
  }
  
  // LinkedIn posts methods
  async fetchLinkedInPosts() {
    return fetchLinkedInPosts();
  }
  
  async saveLinkedInPost(post: any) {
    return saveLinkedInPost(post);
  }
  
  async deleteLinkedInPost(id: string) {
    return deleteLinkedInPost(id);
  }
  
  // Migration and reset methods
  async migrateFromLocalStorage(localContent: SiteContent, storageKey: string) {
    return migrateFromLocalStorage(localContent, storageKey);
  }
  
  async resetToDefault(defaultData: SiteContent) {
    return resetToDefault(defaultData);
  }
}

export const databaseService = new DatabaseService();
