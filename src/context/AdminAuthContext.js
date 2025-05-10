
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AdminAuthContext = createContext(undefined);

// This is a simple in-memory auth for demo purposes
// In a real application, you would use a more secure authentication method
const DEMO_USER = {
  id: '1',
  email: 'rodrigo',
  password: '!67943Ro' // In a real app, never store plaintext passwords
};

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('urbis_cms_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          id: parsedUser.id,
          email: parsedUser.email
        });
      } catch (e) {
        localStorage.removeItem('urbis_cms_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      // Simple demo authentication
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        const loggedInUser = {
          id: DEMO_USER.id,
          email: DEMO_USER.email
        };
        
        setUser(loggedInUser);
        localStorage.setItem('urbis_cms_user', JSON.stringify(loggedInUser));
        
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso!",
        });
      } else {
        toast({
          title: "Erro",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urbis_cms_user');
    toast({
      title: "Logout",
      description: "Você saiu do sistema.",
    });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
