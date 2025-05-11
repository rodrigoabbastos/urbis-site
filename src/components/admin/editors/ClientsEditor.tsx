
import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TrashIcon, PlusCircleIcon, ImageIcon, MoveUp, MoveDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cmsService } from '@/services/cmsService';
import { ClientLogo } from '@/services/cms/types';
import { v4 as uuidv4 } from '@/lib/uuid';

const ClientsEditor = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logos, setLogos] = useState<ClientLogo[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const content = await cmsService.getContent();
        if (content.clients) {
          setTitle(content.clients.title);
          setDescription(content.clients.description);
          setLogos(content.clients.logos);
        }
      } catch (error) {
        console.error('Error loading client logos:', error);
        toast({
          title: 'Erro ao carregar conteúdo',
          description: 'Não foi possível carregar os logotipos dos clientes.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, [toast]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await cmsService.updateClients({
        title,
        description,
        logos
      });
      
      toast({
        title: 'Conteúdo salvo',
        description: 'As alterações foram salvas com sucesso.',
      });
    } catch (error) {
      console.error('Error saving client logos:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as alterações.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addLogo = () => {
    const newLogo: ClientLogo = {
      id: uuidv4(),
      name: 'Novo Cliente',
      image: '',
      order: logos.length
    };
    
    setLogos([...logos, newLogo]);
  };

  const updateLogo = (id: string, field: keyof ClientLogo, value: string | number) => {
    setLogos(logos.map(logo => 
      logo.id === id ? { ...logo, [field]: value } : logo
    ));
  };

  const removeLogo = (id: string) => {
    setLogos(logos.filter(logo => logo.id !== id));
  };

  const moveLogo = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === logos.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedLogos = [...logos];
    const temp = updatedLogos[index];
    updatedLogos[index] = updatedLogos[newIndex];
    updatedLogos[newIndex] = temp;
    
    // Update order numbers
    updatedLogos.forEach((logo, idx) => {
      logo.order = idx;
    });
    
    setLogos(updatedLogos);
  };

  return (
    <AdminLayout title="Quem Confia na URBIS">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Título da Seção</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Logotipos dos Clientes</CardTitle>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addLogo}
                disabled={isLoading}
              >
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Adicionar Logo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logos.map((logo, index) => (
                  <div 
                    key={logo.id} 
                    className="border rounded-md p-4 relative bg-white"
                  >
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`logo-name-${logo.id}`}>Nome do Cliente</Label>
                        <Input
                          id={`logo-name-${logo.id}`}
                          value={logo.name}
                          onChange={(e) => updateLogo(logo.id, 'name', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`logo-image-${logo.id}`}>URL da Imagem</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`logo-image-${logo.id}`}
                            value={logo.image}
                            onChange={(e) => updateLogo(logo.id, 'image', e.target.value)}
                            disabled={isLoading}
                            placeholder="https://exemplo.com/logo.png"
                          />
                        </div>
                      </div>
                      
                      {logo.image && (
                        <div className="flex justify-center border rounded-md p-2 bg-gray-50">
                          <img 
                            src={logo.image} 
                            alt={logo.name} 
                            className="h-16 object-contain" 
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial'%3EImagem não disponível%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => moveLogo(index, 'up')}
                            disabled={isLoading || index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => moveLogo(index, 'down')}
                            disabled={isLoading || index === logos.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeLogo(logo.id)}
                          disabled={isLoading}
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {logos.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-gray-50">
                    <ImageIcon className="h-10 w-10 text-gray-400" />
                    <h3 className="mt-4 text-sm font-medium text-gray-900">Nenhum logotipo adicionado</h3>
                    <p className="mt-1 text-sm text-gray-500">Adicione o primeiro logotipo de cliente clicando no botão acima.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ClientsEditor;
