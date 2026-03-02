import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
// --- FIX: Imported useAuth from the hook file ---
import { useAuth } from '../../context/useAuth';

const AdminLayout = () => {
  const { user } = useAuth();

  // --- UPDATED: Protect routes based on role ---
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        {/* Content area */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;