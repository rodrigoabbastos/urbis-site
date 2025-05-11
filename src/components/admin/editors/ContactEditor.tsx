
import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService, ContactInfo } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const ContactEditor = () => {
  const [formData, setFormData] = useState<ContactInfo>({
    email: '',
    phone: '(12) 99203-1890',
    whatsapp: '5512992031890',
    address: '',
    mapUrl: ''
  });
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await cmsService.getContent();
      setFormData(content.contact);
    };
    
    loadContent();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      cmsService.updateContactInfo(formData);
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as informações de contato.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AdminLayout title="Informações de Contato">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="contato@urbis.com.br"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
              placeholder="(12) 99203-1890"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input 
              id="whatsapp" 
              name="whatsapp" 
              value={formData.whatsapp} 
              onChange={handleChange}
              placeholder="5512992031890"
            />
            <p className="text-xs text-muted-foreground">
              Formato internacional sem espaços ou caracteres especiais. Ex: 5512992031890
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Textarea 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange}
              placeholder="Av. Carlos Gomes, 1001, Porto Alegre - RS"
              rows={2}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mapUrl">URL do Google Maps (embed)</Label>
          <Input 
            id="mapUrl" 
            name="mapUrl" 
            value={formData.mapUrl} 
            onChange={handleChange}
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
          <p className="text-xs text-muted-foreground">
            URL completa de incorporação (embed) do Google Maps
          </p>
        </div>
        
        {formData.mapUrl && (
          <div className="border rounded-md p-2">
            <p className="text-sm text-gray-500 mb-2">Prévia do mapa:</p>
            <div className="aspect-video">
              <iframe 
                src={formData.mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="bg-urbis-primary hover:bg-urbis-primary/90"
        >
          Salvar alterações
        </Button>
      </form>
    </AdminLayout>
  );
};

export default ContactEditor;
