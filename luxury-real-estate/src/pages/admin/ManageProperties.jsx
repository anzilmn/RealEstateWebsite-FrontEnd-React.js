import { useState } from 'react';
import { properties as initialProperties } from '../../data/properties';

const ManageProperties = () => {
  const [propertiesList, setPropertiesList] = useState(initialProperties);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setPropertiesList(propertiesList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif text-luxury-dark mb-8">Manage Properties</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {propertiesList.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img src={p.imageUrl} alt={p.title} className="w-12 h-10 object-cover rounded" />
                  {p.title}
                </td>
                <td className="p-3">${p.price.toLocaleString()}</td>
                <td className="p-3">{p.location}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-sm text-xs ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status || 'Active'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button className="text-sm text-luxury-gold hover:underline">Edit</button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;