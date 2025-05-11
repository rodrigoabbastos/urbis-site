
import { useAdminAuth } from '@/context/AdminAuthContext';
import LoginPage from '@/components/admin/LoginPage';
import Dashboard from '@/components/admin/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import HeroEditor from '@/components/admin/editors/HeroEditor';
import AboutEditor from '@/components/admin/editors/AboutEditor';
import ServicesEditor from '@/components/admin/editors/ServicesEditor';
import MethodologyEditor from '@/components/admin/editors/MethodologyEditor';
import ProjectsEditor from '@/components/admin/editors/ProjectsEditor';
import ContactEditor from '@/components/admin/editors/ContactEditor';
import LinkedInPostsEditor from '@/components/admin/editors/LinkedInPostsEditor';
import ClientsEditor from '@/components/admin/editors/ClientsEditor';
import SectionVisibilityEditor from '@/components/admin/editors/SectionVisibilityEditor';
import EbooksEditor from '@/components/admin/editors/EbooksEditor';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const Admin = () => {
  const { isAuthenticated } = useAdminAuth();
  
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/hero" element={
        <ProtectedRoute>
          <HeroEditor />
        </ProtectedRoute>
      } />
      <Route path="/about" element={
        <ProtectedRoute>
          <AboutEditor />
        </ProtectedRoute>
      } />
      <Route path="/clients" element={
        <ProtectedRoute>
          <ClientsEditor />
        </ProtectedRoute>
      } />
      <Route path="/services" element={
        <ProtectedRoute>
          <ServicesEditor />
        </ProtectedRoute>
      } />
      <Route path="/methodology" element={
        <ProtectedRoute>
          <MethodologyEditor />
        </ProtectedRoute>
      } />
      <Route path="/projects" element={
        <ProtectedRoute>
          <ProjectsEditor />
        </ProtectedRoute>
      } />
      <Route path="/contact" element={
        <ProtectedRoute>
          <ContactEditor />
        </ProtectedRoute>
      } />
      <Route path="/linkedin" element={
        <ProtectedRoute>
          <LinkedInPostsEditor />
        </ProtectedRoute>
      } />
      <Route path="/visibility" element={
        <ProtectedRoute>
          <SectionVisibilityEditor />
        </ProtectedRoute>
      } />
      <Route path="/ebooks" element={
        <ProtectedRoute>
          <EbooksEditor />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default Admin;
