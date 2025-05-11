
import { useState, useEffect } from 'react';
import { cmsService } from '@/services/cmsService';
import { SiteContent } from '@/services/cmsService';

export const useDashboard = () => {
  const [content, setContent] = useState<SiteContent>(cmsService.getContentSync());
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const fetchedContent = await cmsService.getContent();
      setContent(fetchedContent);
    } catch (error) {
      console.error('Error loading dashboard content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetContent = () => {
    if (window.confirm("Tem certeza de que deseja redefinir todo o conteúdo para os valores padrão? Esta ação não pode ser desfeita.")) {
      cmsService.resetToDefault();
      loadContent();
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  return {
    content,
    isLoading,
    handleResetContent
  };
};

export default useDashboard;
