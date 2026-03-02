import { useState } from 'react';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Property:', formData);
    alert('Property Added Successfully! (Check Console)');
    // Reset form after submission
    setFormData({ title: '', price: '', location: '', beds: '', baths: '', description: '', imageUrl: '' });
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif text-luxury-dark mb-8">Add New Property</h1>
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-sm shadow-sm max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          <input 
            type="text" 
            name="title" 
            placeholder="Property Title" 
            value={formData.title} 
            onChange={handleChange} 
            className="col-span-2 p-3 border rounded" 
            required 
          />
          <input 
            type="number" 
            name="price" 
            placeholder="Price ($)" 
            value={formData.price} 
            onChange={handleChange} 
            className="p-3 border rounded" 
            required 
          />
          <input 
            type="text" 
            name="location" 
            placeholder="Location" 
            value={formData.location} 
            onChange={handleChange} 
            className="p-3 border rounded" 
            required 
          />
          <input 
            type="number" 
            name="beds" 
            placeholder="Bedrooms" 
            value={formData.beds} 
            onChange={handleChange} 
            className="p-3 border rounded" 
            required 
          />
          <input 
            type="number" 
            name="baths" 
            placeholder="Bathrooms" 
            value={formData.baths} 
            onChange={handleChange} 
            className="p-3 border rounded" 
            required 
          />
          <input 
            type="text" 
            name="imageUrl" 
            placeholder="Image URL" 
            value={formData.imageUrl} 
            onChange={handleChange} 
            className="col-span-2 p-3 border rounded" 
            required 
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
            className="col-span-2 p-3 border rounded h-32" 
            required 
          ></textarea>
        </div>
        <button type="submit" className="mt-8 bg-luxury-dark text-white px-10 py-3 hover:bg-luxury-gold transition w-full md:w-auto">
          Publish Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;