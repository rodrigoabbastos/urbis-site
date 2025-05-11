
import { SiteContent } from '@/services/cms/types';
import { mainContentRepository } from './mainContentRepository';
import { projectsContentRepository } from './projectsContentRepository';
import { resetRepository } from './resetRepository';

// Export functions from the various repositories

// Functions from mainContentRepository
export const saveContent = mainContentRepository.saveContent;
export const saveMainContent = mainContentRepository.saveContent; // Alias
export const fetchMainContent = mainContentRepository.fetchMainContent;
export const loadContent = mainContentRepository.loadContent;

// Functions from projectsContentRepository
export const fetchProjectsInfo = projectsContentRepository.fetchProjectsInfo;
export const saveProjectsInfo = projectsContentRepository.saveProjectsInfo;

// Functions from resetRepository
export const resetContentToDefault = resetRepository.resetContentToDefault;
