
import { SiteContent, Service, Project } from '../types';
import { defaultContent } from '../defaultContent';
import { supabaseHelper } from './databaseUtils';
import { createTablesIfNotExist } from './tableInitializer';
import { saveContent } from './contentRepository';
import { saveProject } from './projectsRepository';
import { saveLinkedInPost } from './linkedInRepository';
import { LinkedInPost } from '@/components/linkedin/types';

export const migrateFromLocalStorage = async (localContent: SiteContent, storageKey: string): Promise<boolean> => {
  try {
    // First make sure tables are created
    await createTablesIfNotExist();
    
    // Save main content sections
    const mainContentResult = await saveContent({
      hero: localContent.hero,
      about: localContent.about,
      services: localContent.services,
      methodology: localContent.methodology,
      contact: localContent.contact,
      clients: localContent.clients,
      sectionVisibility: localContent.sectionVisibility,
      ebooks: localContent.ebooks
    });
    
    if (!mainContentResult) {
      console.error('Failed to migrate main content from localStorage');
      return false;
    }
    
    // Save projects one by one
    const projects = localContent.projects.items;
    let projectsSuccess = true;
    
    if (Array.isArray(projects) && projects.length > 0) {
      for (const project of projects) {
        const projectResult = await saveProject(project);
        if (!projectResult) {
          console.error(`Failed to migrate project ${project.id} from localStorage`);
          projectsSuccess = false;
        }
      }
    }
    
    // Save LinkedIn posts one by one
    const posts = localContent.linkedInPosts;
    let postsSuccess = true;
    
    if (Array.isArray(posts) && posts.length > 0) {
      for (const post of posts) {
        const postResult = await saveLinkedInPost(post);
        if (!postResult) {
          console.error(`Failed to migrate LinkedIn post ${post.id} from localStorage`);
          postsSuccess = false;
        }
      }
    }
    
    // If all migrations were successful, remove localStorage item
    if (mainContentResult && projectsSuccess && postsSuccess) {
      localStorage.removeItem(storageKey);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error during migration from localStorage:', error);
    return false;
  }
};

export const resetToDefault = async (defaultData: SiteContent): Promise<boolean> => {
  try {
    // First make sure tables are created
    await createTablesIfNotExist();
    
    // Reset main content to defaults
    const mainContentResult = await saveContent({
      hero: defaultData.hero,
      about: defaultData.about,
      services: defaultData.services,
      methodology: defaultData.methodology,
      contact: defaultData.contact,
      clients: defaultData.clients,
      sectionVisibility: defaultData.sectionVisibility,
      ebooks: defaultData.ebooks
    });
    
    if (!mainContentResult) {
      console.error('Failed to reset main content to defaults');
      return false;
    }
    
    // Delete all existing projects and re-save default projects
    const truncateProjectsResult = await supabaseHelper.truncateTable('projects');
    
    if (!truncateProjectsResult) {
      console.error('Failed to truncate projects table');
      return false;
    }
    
    // Save default projects one by one
    const projects = defaultData.projects.items;
    let projectsSuccess = true;
    
    if (Array.isArray(projects) && projects.length > 0) {
      for (const project of projects) {
        const projectResult = await saveProject(project);
        if (!projectResult) {
          console.error(`Failed to save default project ${project.id}`);
          projectsSuccess = false;
        }
      }
    }
    
    // Delete all existing LinkedIn posts and re-save default posts
    const truncatePostsResult = await supabaseHelper.truncateTable('linkedin_posts');
    
    if (!truncatePostsResult) {
      console.error('Failed to truncate linkedin_posts table');
      return false;
    }
    
    // Save default LinkedIn posts one by one
    const posts = defaultData.linkedInPosts;
    let postsSuccess = true;
    
    if (Array.isArray(posts) && posts.length > 0) {
      for (const post of posts) {
        const postResult = await saveLinkedInPost(post);
        if (!postResult) {
          console.error(`Failed to save default LinkedIn post ${post.id}`);
          postsSuccess = false;
        }
      }
    }
    
    return mainContentResult && projectsSuccess && postsSuccess;
  } catch (error) {
    console.error('Error during reset to default:', error);
    return false;
  }
};
