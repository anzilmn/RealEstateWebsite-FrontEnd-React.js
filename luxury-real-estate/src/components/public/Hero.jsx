import { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-luxury-dark">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-50 bg-[url('/hero-bg.jpg')] bg-cover bg-center"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-luxury-light p-6">
        <h1 className="text-5xl md:text-7xl font-serif tracking-widest mb-6">
          EXQUISITE LIVING
        </h1>
        <p className="text-xl font-light mb-10 tracking-wide max-w-2xl mx-auto">
          Discover handpicked luxury properties in the world's most coveted destinations.
        </p>

        {/* --- UPDATED: Search Form --- */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2 bg-white p-2 rounded-full shadow-lg mb-10">
            <input 
                type="text" 
                placeholder="Search by location, keyword, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-3 px-6 text-luxury-dark rounded-full focus:outline-none"
            />
            <button type="submit" className="bg-luxury-gold text-luxury-dark px-8 py-3 rounded-full font-semibold hover:bg-white transition">
                Search
            </button>
        </form>
        
        <button className="border border-luxury-gold text-luxury-gold px-10 py-4 hover:bg-luxury-gold hover:text-white transition duration-300 uppercase tracking-widest text-sm">
          Explore Estates
        </button>
      </div>
    </div>
  );
};

export default Hero;