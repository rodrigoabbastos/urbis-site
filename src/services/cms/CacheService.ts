
import { SiteContent } from './types';

export class CacheService {
  private contentCache: SiteContent | null = null;
  
  hasCache(): boolean {
    return this.contentCache !== null;
  }
  
  getCache(): SiteContent | null {
    return this.contentCache;
  }
  
  setCache(content: SiteContent): void {
    this.contentCache = content;
  }
  
  clearCache(): void {
    this.contentCache = null;
  }
}

export const cacheService = new CacheService();
