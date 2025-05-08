
import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Trash2, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LinkedInPost } from '@/components/linkedin/types';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cmsService } from '@/services/cms';

// Form validation schema
const postSchema = z.object({
  id: z.string().optional(),
  text_snippet: z.string().min(10, 'O texto deve ter pelo menos 10 caracteres'),
  image_url: z.string().optional(),
  post_url: z.string().url('O URL deve ser válido'),
  date: z.string(),
  likes: z.number().min(0, 'O número de curtidas não pode ser negativo'),
  comments: z.number().min(0, 'O número de comentários não pode ser negativo'),
});

type PostFormValues = z.infer<typeof postSchema>;

const LinkedInPostsEditor = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<LinkedInPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: '',
      text_snippet: '',
      image_url: '',
      post_url: '',
      date: new Date().toISOString(),
      likes: 0,
      comments: 0,
    }
  });

  useEffect(() => {
    // Load LinkedIn posts from CMS
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await cmsService.getLinkedInPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post: LinkedInPost) => {
    setCurrentPost(post);
    form.reset({
      id: post.id,
      text_snippet: post.text_snippet,
      image_url: post.image_url || '',
      post_url: post.post_url,
      date: post.date,
      likes: post.likes,
      comments: post.comments,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza de que deseja excluir esta publicação?")) {
      try {
        await cmsService.deleteLinkedInPost(id);
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleCreate = () => {
    setCurrentPost(null);
    form.reset({
      id: '',
      text_snippet: '',
      image_url: '',
      post_url: '',
      date: new Date().toISOString(),
      likes: 0,
      comments: 0,
    });
    setIsEditDialogOpen(true);
  };

  const onSubmit = async (data: PostFormValues) => {
    try {
      // Ensure we have all required fields for LinkedInPost
      const postData: LinkedInPost = {
        id: data.id || String(Date.now()),
        text_snippet: data.text_snippet,
        image_url: data.image_url,
        post_url: data.post_url,
        date: data.date,
        likes: data.likes,
        comments: data.comments,
      };
      
      await cmsService.updateLinkedInPost(postData);
      setIsEditDialogOpen(false);
      await loadPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (error) {
      return 'Data inválida';
    }
  };

  return (
    <AdminLayout title="Gerenciar Publicações do LinkedIn">
      <div className="mb-8">
        <p className="text-gray-500 mb-4">
          Adicione, edite ou exclua as publicações do LinkedIn que serão exibidas no site.
        </p>
        
        <Button 
          onClick={handleCreate}
          className="bg-urbis-primary hover:bg-urbis-primary/90 mb-6"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Publicação
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Carregando publicações...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="text-sm text-gray-500">
                    {formatDate(post.date)}
                  </div>
                </CardHeader>
                <CardContent className="py-4">
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.text_snippet}</p>
                  {post.image_url && (
                    <div className="relative h-32 overflow-hidden rounded-md mb-2">
                      <img
                        src={post.image_url}
                        alt="Imagem da publicação"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div>👍 {post.likes}</div>
                    <div>💬 {post.comments}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-2"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Não há publicações do LinkedIn cadastradas.</p>
              <Button 
                onClick={handleCreate}
                variant="outline" 
                className="mt-2"
              >
                Adicionar primeira publicação
              </Button>
            </div>
          )}
        </div>
      )}
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentPost ? 'Editar Publicação' : 'Nova Publicação'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="text_snippet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto da publicação</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Digite o texto da publicação..." 
                        className="resize-y min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="post_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link da publicação</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://www.linkedin.com/posts/..." 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da imagem (opcional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://..." 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="likes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curtidas</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentários</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default LinkedInPostsEditor;
