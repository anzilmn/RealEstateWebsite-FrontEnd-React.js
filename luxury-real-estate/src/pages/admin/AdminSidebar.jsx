import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-luxury-dark text-white min-h-screen p-6">
      <h2 className="text-2xl font-serif text-luxury-gold mb-10">LUXURY ADMIN</h2>
      <nav className="space-y-4">
        <Link to="/admin" className="block p-2 hover:bg-luxury-gold rounded">Dashboard</Link>
        <Link to="/admin/add-property" className="block p-2 hover:bg-luxury-gold rounded">Add House</Link>
        <Link to="/admin/properties" className="block p-2 hover:bg-luxury-gold rounded">View Houses</Link>
        <Link to="/admin/users" className="block p-2 hover:bg-luxury-gold rounded">All Users</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;