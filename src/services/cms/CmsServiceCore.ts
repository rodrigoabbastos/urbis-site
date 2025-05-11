
import { SiteContent } from './types';
import { CacheService } from './CacheService';
import { ContentManager } from './core/ContentManager';

export class CmsServiceCore {
  private readonly contentManager: ContentManager;
  
  constructor(cacheService: CacheService) {
    this.contentManager = new ContentManager(cacheService);
  }

  async getContent(): Promise<SiteContent> {
    return this.contentManager.getContent();
  }
  
  getContentSync(): SiteContent {
    return this.contentManager.getContentSync();
  }
  
  async saveContent(content: SiteContent): Promise<void> {
    return this.contentManager.saveContent(content);
  }
  
  async updatePartialContent<K extends keyof SiteContent>(
    section: K, 
    content: SiteContent[K]
  ): Promise<void> {
    return this.contentManager.updatePartialContent(section, content);
  }
  
  async loadContentToCache(): Promise<void> {
    return this.contentManager.loadContentToCache();
  }
  
  async resetToDefault(): Promise<void> {
    return this.contentManager.resetToDefault();
  }
}

const cmsServiceCore = new CmsServiceCore(new CacheService());
export default cmsServiceCore;
