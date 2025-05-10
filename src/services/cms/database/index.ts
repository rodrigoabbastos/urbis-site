
import { SiteContent } from '../types';
import { ContentDatabaseService } from './contentService';
import { ProjectsDatabaseService } from './projectsService';
import { LinkedInDatabaseService } from './linkedInService';
import { MigrationService } from './migrationService';
import { DatabaseInitService } from './databaseInitService';

export class DatabaseService {
  private contentService: ContentDatabaseService;
  private projectsService: ProjectsDatabaseService;
  private linkedInService: LinkedInDatabaseService;
  private migrationService: MigrationService;
  private initService: DatabaseInitService;
  
  constructor() {
    this.contentService = new ContentDatabaseService();
    this.projectsService = new ProjectsDatabaseService();
    this.linkedInService = new LinkedInDatabaseService();
    this.migrationService = new MigrationService();
    this.initService = new DatabaseInitService();
  }

  // Initialization services
  createTablesIfNotExist = async () => {
    return this.initService.createTablesIfNotExist();
  };

  // Content services
  fetchMainContent = async () => {
    return this.contentService.fetchMainContent();
  };

  saveMainContent = async (content: {
    hero: any;
    about: any;
    services: any;
    methodology: any;
    contact: any;
  }) => {
    return this.contentService.saveMainContent(content);
  };

  // Projects services
  fetchProjectsInfo = async () => {
    return this.projectsService.fetchProjectsInfo();
  };

  fetchProjects = async () => {
    return this.projectsService.fetchProjects();
  };

  saveProjectsInfo = async (projectsInfo: { title: string; description: string }) => {
    return this.projectsService.saveProjectsInfo(projectsInfo);
  };

  saveProject = async (project: any) => {
    return this.projectsService.saveProject(project);
  };

  deleteProject = async (id: string) => {
    return this.projectsService.deleteProject(id);
  };

  // LinkedIn services
  fetchLinkedInPosts = async () => {
    return this.linkedInService.fetchLinkedInPosts();
  };

  saveLinkedInPost = async (post: any) => {
    return this.linkedInService.saveLinkedInPost(post);
  };

  deleteLinkedInPost = async (id: string) => {
    return this.linkedInService.deleteLinkedInPost(id);
  };

  // Migration services
  migrateFromLocalStorage = async (localContent: SiteContent, storageKey: string) => {
    return this.migrationService.migrateFromLocalStorage(localContent, storageKey);
  };

  resetToDefault = async (defaultData: SiteContent) => {
    return this.migrationService.resetToDefault(defaultData);
  };
}

// Create and export the singleton instance
export const databaseService = new DatabaseService();

// Re-export for convenience
export * from './supabaseHelper';
