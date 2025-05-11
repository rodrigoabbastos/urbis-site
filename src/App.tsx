
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

// Componente que detecta URLs WordPress
const WordPressHandler = () => {
  const location = useLocation();
  
  // Lista de prefixos de URL que pertencem ao WordPress
  const wordpressPrefixes = [
    '/wp-admin',
    '/wp-content',
    '/wp-includes',
    '/wp-json',
    '/wp-login',
    '/feed',
    '/category',
    '/tag',
    '/author'
  ];
  
  // Verifica se a URL atual começa com algum prefixo WordPress
  const isWordPressUrl = wordpressPrefixes.some(prefix => 
    location.pathname.startsWith(prefix)
  );
  
  // Se for uma URL do WordPress, redireciona para o WordPress real
  if (isWordPressUrl) {
    console.log('Redirecionando para WordPress:', location.pathname);
    
    // Redireciona para o mesmo caminho no host atual
    window.location.href = location.pathname;
    return null;
  }
  
  // Caso contrário, mostra a página inicial do React
  return <Index />;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<WordPressHandler />} />
                <Route path="/admin/*" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<WordPressHandler />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
