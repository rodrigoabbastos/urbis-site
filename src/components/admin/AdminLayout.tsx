
import React from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, Home, Image, Menu, Settings, User, X, Linkedin } from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/admin' },
    { label: 'Hero Section', icon: Image, path: '/admin/hero' },
    { label: 'About Us', icon: User, path: '/admin/about' },
    { label: 'Services', icon: FileText, path: '/admin/services' },
    { label: 'Methodology', icon: FileText, path: '/admin/methodology' },
    { label: 'Projects', icon: Image, path: '/admin/projects' },
    { label: 'LinkedIn Posts', icon: Linkedin, path: '/admin/linkedin' },
    { label: 'Contact Info', icon: Settings, path: '/admin/contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="lg:hidden p-2 h-auto" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </Button>
          <a href="/" className="text-xl font-bold text-urbis-primary">URBIS CMS</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="/" className="text-sm text-urbis-navy hover:text-urbis-primary">
            Visualizar site
          </a>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => logout()}
          >
            Sair
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside 
          className={`
            fixed z-50 lg:relative w-64 transition-all duration-300 ease-in-out bg-white shadow-md h-full 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 flex justify-between items-center border-b lg:hidden">
            <h2 className="font-bold text-urbis-primary">Menu</h2>
            <Button 
              variant="ghost" 
              className="p-1 h-auto" 
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left ${
                      window.location.pathname === item.path ? 'bg-urbis-primary/10 text-urbis-primary' : ''
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-urbis-navy">{title}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Gerencie o conteúdo da seção {title}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
