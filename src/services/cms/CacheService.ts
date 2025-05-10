
import { SiteContent } from './types';

export class CacheService {
  private contentCache: SiteContent | null = null;
  
  hasCache(): boolean {
    // Always return false to force reading from Supabase
    return false;
  }
  
  getCache(): SiteContent | null {
    // Always return null to force reading from Supabase
    return null;
  }
  
  setCache(content: SiteContent): void {
    // Don't actually cache anything
    // This effectively disables caching
    this.contentCache = null;
  }
  
  clearCache(): void {
    this.contentCache = null;
  }
}

export const cacheService = new CacheService();
