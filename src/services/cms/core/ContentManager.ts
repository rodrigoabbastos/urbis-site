
import { SiteContent } from '../types';
import { BaseService } from '../BaseService';
import { CacheService } from '../CacheService';
import { ContentLoader } from './ContentLoader';
import { ContentSaver } from './ContentSaver';
import { ContentResetter } from './ContentResetter';
import { defaultContent } from '../defaultContent';

export class ContentManager extends BaseService {
  private readonly cacheService: CacheService;
  private readonly contentLoader: ContentLoader;
  private readonly contentSaver: ContentSaver;
  private readonly contentResetter: ContentResetter;
  
  constructor(cacheService: CacheService) {
    super();
    this.cacheService = cacheService;
    this.contentLoader = new ContentLoader();
    this.contentSaver = new ContentSaver();
    this.contentResetter = new ContentResetter();
  }

  async getContent(): Promise<SiteContent> {
    try {
      // Always reload content from database to ensure fresh data
      console.log('Getting fresh content from database');
      return await this.contentLoader.loadContentFromDatabase();
    } catch (error) {
      console.error('Error getting content from database:', error);
      return defaultContent;
    }
  }
  
  // Method that returns default content immediately
  getContentSync(): SiteContent {
    console.log('getContentSync called, immediately fetching from database');
    // Since we can't do async calls in sync method, return default content
    // The component should use getContent() instead for fresh data
    return defaultContent;
  }
  
  async saveContent(content: SiteContent): Promise<void> {
    return this.contentSaver.saveContent(content);
  }
  
  // Add the updatePartialContent method
  async updatePartialContent<K extends keyof SiteContent>(
    section: K, 
    content: SiteContent[K]
  ): Promise<void> {
    return this.contentSaver.updatePartialContent(section, content);
  }
  
  // Add method to update section title and description
  async updateSectionInfo(
    section: keyof SiteContent,
    title: string,
    description: string | string[]
  ): Promise<void> {
    return this.contentSaver.updateSectionInfo(section, title, description);
  }
  
  // Legacy method kept for compatibility, but now just forwards to loadContentFromDatabase
  async loadContentToCache(): Promise<void> {
    try {
      // Load content directly, but don't actually cache it
      await this.contentLoader.loadContentFromDatabase();
      console.log('Content loaded to cache (disabled)');
    } catch (error) {
      console.error('Error in loadContentToCache:', error);
    }
  }
  
  async resetToDefault(): Promise<void> {
    return this.contentResetter.resetToDefault();
  }
}
