
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

// Detecção de raiz da aplicação para evitar redirecionamento incorreto
const Root = () => {
  // Verifica se estamos em urbis.com.br/wp-*
  const isWpPath = window.location.pathname.startsWith('/wp');
  
  // Se estamos em um caminho WordPress, redireciona para a raiz
  if (isWpPath) {
    window.location.href = window.location.origin;
    return null;
  }
  
  // Caso contrário, carrega a página inicial
  return <Index />;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/admin/*" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
