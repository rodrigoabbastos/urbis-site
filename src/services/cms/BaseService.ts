
import { toast } from '@/components/ui/use-toast';
import { SiteContent } from './types';
import { defaultContent } from './defaultContent';

export class BaseService {
  protected showSuccessToast(message: string): void {
    toast({
      title: "Sucesso",
      description: message,
    });
  }

  protected showErrorToast(message: string): void {
    toast({
      title: "Erro",
      description: message,
      variant: "destructive",
    });
  }

  protected handleError(error: unknown, errorMessage: string): void {
    console.error(errorMessage, error);
    this.showErrorToast(errorMessage);
  }
}
