
import { supabaseHelper } from './databaseUtils';
import { createTablesIfNotExist } from './tableInitializer';

export async function fetchMainContent(): Promise<any | null> {
  try {
    // Ensure tables exist before fetching
    await createTablesIfNotExist();
    
    console.log('Fetching main content from database...');
    const { data, error } = await supabaseHelper.from('content')
      .select('*')
      .eq('id', 'main')
      .single();
    
    if (error) {
      console.warn('Erro ao carregar conteúdo principal:', error.message);
      return null;
    }
    
    console.log('Main content fetched successfully:', data);
    
    // Verificar se data existe e se tem a propriedade clients antes de acessá-la
    if (data && data.clients) {
      console.log('Dados de clientes carregados:', data.clients);
    } else {
      console.log('Nenhum dado de clientes encontrado');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching main content:', error);
    return null;
  }
}

export async function fetchProjectsInfo(): Promise<any | null> {
  try {
    // Ensure tables exist before fetching
    await createTablesIfNotExist();
    
    const { data, error } = await supabaseHelper.from('content')
      .select('*')
      .eq('id', 'projects')
      .single();
    
    if (error) {
      console.warn('Erro ao carregar informações dos projetos:', error.message);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching projects info:', error);
    return null;
  }
}

export async function saveMainContent(content: {
  hero: any;
  about: any;
  services: any;
  methodology: any;
  contact: any;
  clients?: any;
  sectionVisibility?: any;
  ebooks?: any;
}): Promise<boolean> {
  try {
    // Ensure tables exist before saving
    await createTablesIfNotExist();
    
    console.log('Saving main content to database:', content);
    // Verificar explicitamente o campo clients
    if (content.clients) {
      console.log('Salvando dados de clientes:', content.clients);
    }
    
    const { error } = await supabaseHelper.from('content')
      .upsert({ 
        id: 'main',
        ...content,
        updated_at: new Date()
      } as any);
    
    if (error) {
      console.error('Error in saveMainContent:', error);
      throw error;
    }
    console.log('Main content saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving main content:', error);
    return false;
  }
}

export async function saveProjectsInfo(projectsInfo: { title: string; description: string }): Promise<boolean> {
  try {
    // Ensure tables exist before saving
    await createTablesIfNotExist();
    
    const { error } = await supabaseHelper.from('content')
      .upsert({ 
        id: 'projects',
        ...projectsInfo,
        updated_at: new Date()
      } as any);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving projects info:', error);
    return false;
  }
}
