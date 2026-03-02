import { properties } from '../../data/properties';

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-sm shadow-sm border-l-4" style={{ borderColor: color }}>
    <p className="text-sm text-gray-500 uppercase tracking-wider">{title}</p>
    <p className="text-4xl font-serif text-luxury-dark mt-2">{value}</p>
  </div>
);

const Dashboard = () => {
  const totalProperties = properties.length;
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif text-luxury-dark mb-8">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Properties" value={totalProperties} color="#C5A065" />
        <StatCard title="Total Users" value="48" color="#1A1A1A" />
        <StatCard title="Portfolio Value" value={`$${(totalValue / 1000000).toFixed(1)}M`} color="#C5A065" />
      </div>
    </div>
  );
};

export default Dashboard;