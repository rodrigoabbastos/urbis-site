
// Removendo o import duplicado de React
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast.jsx';

// Criação do contexto de autenticação
const AdminAuthContext = createContext();

// Hook personalizado para acessar o contexto
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

// Provedor do contexto de autenticação
export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  // Função para verificar se o usuário está autenticado
  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    
    if (token) {
      setIsAuthenticated(true);
      if (user) {
        setAdminUser(JSON.parse(user));
      }
    }
    
    setLoading(false);
  };

  // Função de login
  const login = (email, password) => {
    // Credenciais simplificadas para demonstração
    // Em produção, isso seria validado contra um backend seguro
    if (email === 'admin@urbis.com.br' && password === 'admin123') {
      const token = 'demo-token-' + Date.now();
      const user = {
        email,
        name: 'Administrador',
        role: 'admin'
      };
      
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));
      
      setIsAuthenticated(true);
      setAdminUser(user);
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao painel administrativo."
      });
      
      return true;
    } else {
      toast({
        title: "Erro de autenticação",
        description: "E-mail ou senha inválidos.",
        variant: "destructive"
      });
      
      return false;
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    
    setIsAuthenticated(false);
    setAdminUser(null);
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel administrativo."
    });
  };

  // Valor do contexto
  const value = {
    isAuthenticated,
    loading,
    adminUser,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
