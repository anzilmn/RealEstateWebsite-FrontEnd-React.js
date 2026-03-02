import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-luxury-dark text-white p-6 min-h-screen">
      <h2 className="text-2xl font-serif mb-10 text-white">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/admin" className="block p-2 rounded hover:bg-luxury-gold">Dashboard</Link>
        <Link to="/admin/add-property" className="block p-2 rounded hover:bg-luxury-gold">Add Property</Link>
        <Link to="/admin/properties" className="block p-2 rounded hover:bg-luxury-gold">Manage Properties</Link>
        <Link to="/" className="block p-2 rounded hover:bg-red-600 mt-10">Back to Website</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;