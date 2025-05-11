
import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TrashIcon, PlusCircleIcon, FileTextIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cmsService } from '@/services/cmsService';
import { Ebook } from '@/services/cms/types';
import { v4 as uuidv4 } from '@/lib/uuid';

const EbooksEditor = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ebooks, setEbooks] = useState<Ebook[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const content = await cmsService.getContent();
        if (content.ebooks) {
          setTitle(content.ebooks.title);
          setDescription(content.ebooks.description);
          setEbooks(content.ebooks.items);
        }
      } catch (error) {
        console.error('Error loading ebooks:', error);
        toast({
          title: 'Erro ao carregar conteúdo',
          description: 'Não foi possível carregar os e-books.',
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
      await cmsService.updateEbooks({
        title,
        description,
        items: ebooks
      });
      
      toast({
        title: 'Conteúdo salvo',
        description: 'As alterações foram salvas com sucesso.',
      });
    } catch (error) {
      console.error('Error saving ebooks:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as alterações.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addEbook = () => {
    const newEbook: Ebook = {
      id: uuidv4(),
      title: 'Novo E-book',
      description: 'Descrição do e-book',
      image: '',
      downloadUrl: ''
    };
    
    setEbooks([...ebooks, newEbook]);
  };

  const updateEbook = (id: string, field: keyof Ebook, value: string) => {
    setEbooks(ebooks.map(ebook => 
      ebook.id === id ? { ...ebook, [field]: value } : ebook
    ));
  };

  const removeEbook = (id: string) => {
    setEbooks(ebooks.filter(ebook => ebook.id !== id));
  };

  return (
    <AdminLayout title="E-books">
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
              <CardTitle>E-books para Download</CardTitle>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addEbook}
                disabled={isLoading}
              >
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Adicionar E-book
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ebooks.map((ebook) => (
                  <div 
                    key={ebook.id} 
                    className="border rounded-md p-4 relative bg-white"
                  >
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`ebook-title-${ebook.id}`}>Título do E-book</Label>
                        <Input
                          id={`ebook-title-${ebook.id}`}
                          value={ebook.title}
                          onChange={(e) => updateEbook(ebook.id, 'title', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`ebook-description-${ebook.id}`}>Descrição</Label>
                        <Textarea
                          id={`ebook-description-${ebook.id}`}
                          value={ebook.description}
                          onChange={(e) => updateEbook(ebook.id, 'description', e.target.value)}
                          disabled={isLoading}
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`ebook-image-${ebook.id}`}>URL da Capa</Label>
                        <Input
                          id={`ebook-image-${ebook.id}`}
                          value={ebook.image}
                          onChange={(e) => updateEbook(ebook.id, 'image', e.target.value)}
                          disabled={isLoading}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      
                      {ebook.image && (
                        <div className="flex justify-center border rounded-md p-2 bg-gray-50">
                          <img 
                            src={ebook.image} 
                            alt={ebook.title} 
                            className="h-32 object-contain" 
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial'%3EImagem não disponível%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor={`ebook-url-${ebook.id}`}>URL de Download</Label>
                        <Input
                          id={`ebook-url-${ebook.id}`}
                          value={ebook.downloadUrl}
                          onChange={(e) => updateEbook(ebook.id, 'downloadUrl', e.target.value)}
                          disabled={isLoading}
                          placeholder="https://exemplo.com/ebook.pdf"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEbook(ebook.id)}
                          disabled={isLoading}
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {ebooks.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-gray-50">
                    <FileTextIcon className="h-10 w-10 text-gray-400" />
                    <h3 className="mt-4 text-sm font-medium text-gray-900">Nenhum e-book adicionado</h3>
                    <p className="mt-1 text-sm text-gray-500">Adicione o primeiro e-book clicando no botão acima.</p>
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

export default EbooksEditor;
