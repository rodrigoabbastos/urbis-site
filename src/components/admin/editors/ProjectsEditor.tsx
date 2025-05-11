
import { Dialog } from '@/components/ui/dialog';
import AdminLayout from '../AdminLayout';
import ProjectForm from './projects/ProjectForm';
import ProjectsGrid from './projects/ProjectsGrid';
import SectionInfoForm from './projects/SectionInfoForm';
import { useProjectsEditor } from './projects/useProjectsEditor';

const ProjectsEditor = () => {
  const {
    title,
    description,
    projects,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    currentProject,
    isEditing,
    handleSaveSection,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleSaveProject,
  } = useProjectsEditor();
  
  if (isLoading) {
    return (
      <AdminLayout title="Projetos">
        <div className="flex justify-center p-8">
          <p>Carregando projetos...</p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Projetos">
      <div className="space-y-6">
        <SectionInfoForm 
          title={title} 
          description={description} 
          onSave={handleSaveSection} 
        />
        
        <ProjectsGrid 
          projects={projects}
          onAddNew={handleAddProject}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ProjectForm 
          project={currentProject}
          isEditing={isEditing}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveProject}
        />
      </Dialog>
    </AdminLayout>
  );
};

export default ProjectsEditor;
