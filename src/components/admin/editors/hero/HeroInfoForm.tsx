
import { useState } from 'react';
import { cmsService } from '@/services/cmsService';
import { SectionInfoEditor } from '@/components/admin/editors/common';

interface HeroInfoFormProps {
  title: string;
  subtitle: string;
  onRefresh: () => void;
}

const HeroInfoForm = ({ title, subtitle, onRefresh }: HeroInfoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (newTitle: string, newDescription: string | string[]) => {
    setIsLoading(true);
    try {
      const description = Array.isArray(newDescription) 
        ? newDescription[0] 
        : newDescription;
      
      await cmsService.updateSectionInfo('hero', newTitle, description);
      onRefresh();
    } catch (error) {
      console.error('Error saving hero info:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionInfoEditor
      sectionKey="Hero"
      title={title}
      description={subtitle}
      onSave={handleSave}
      multilineDescription={false}
    />
  );
};

export default HeroInfoForm;
