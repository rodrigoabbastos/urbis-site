
import { Button } from '@/components/ui/button';
import { cmsService } from '@/services/cmsService';

interface DashboardActionsProps {
  onResetContent: () => void;
}

const DashboardActions = ({ onResetContent }: DashboardActionsProps) => {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex flex-col items-start space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Visualizar site</h3>
          <p className="text-sm text-gray-500 mb-3">
            Veja como está o site com as alterações aplicadas
          </p>
          <Button asChild variant="outline">
            <a href="/" target="_blank">Abrir site</a>
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Redefinir conteúdo</h3>
          <p className="text-sm text-gray-500 mb-3">
            Restaurar todo o conteúdo para os valores padrão
          </p>
          <Button variant="destructive" onClick={onResetContent}>
            Redefinir tudo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardActions;
