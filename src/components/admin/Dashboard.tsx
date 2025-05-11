
import AdminLayout from './AdminLayout';
import DashboardSections from './dashboard/DashboardSections';
import DashboardActions from './dashboard/DashboardActions';
import useDashboard from './dashboard/useDashboard';

const Dashboard = () => {
  const { content, isLoading, handleResetContent } = useDashboard();

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center p-8">
          <p>Carregando informações do dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <DashboardSections content={content} />
      <DashboardActions onResetContent={handleResetContent} />
    </AdminLayout>
  );
};

export default Dashboard;
