import { useState } from 'react';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import PropertyCard from '../components/public/PropertyCard';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';
// --- FIX: Imported Leaflet Components ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { usePropertyContext } from '../hooks/usePropertyContext';

// --- FIX: Fix Leaflet marker icon issue ---
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Simple Footer Component
const Footer = () => (
  <footer className="bg-luxury-dark text-gray-400 mt-20 py-12 border-t border-gray-800">
    <div className="container mx-auto text-center">
      <p className="text-xl font-serif text-white mb-4">LUXURY<span className="text-luxury-gold">ESTATES</span></p>
      <p className="text-sm">© 2026 Premium Real Estate Group. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <a href="#" className="hover:text-luxury-gold">Privacy Policy</a>
        <a href="#" className="hover:text-luxury-gold">Terms of Service</a>
      </div>
    </div>
  </footer>
);

const HomePage = () => {
  // State for Filtering and Sorting
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [location, setLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  
  // Use context for compare
  const { comparing, toggleCompare } = usePropertyContext();

  // --- UPDATED: Main Filter & Sort Logic ---
  const applyFiltersAndSort = (loc, search, sort) => {
    let filtered = properties;

    // Filter by Location
    if (loc !== 'All') {
      filtered = filtered.filter(p => p.location === loc);
    }

    // Filter by Search Term
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.location.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    // Sort Results
    if (sort === 'priceLowHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceHighLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'nameAZ') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProperties(filtered);
  };

  const handleFilter = (selectedLocation) => {
    setLocation(selectedLocation);
    applyFiltersAndSort(selectedLocation, searchTerm, sortBy);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFiltersAndSort(location, term, sortBy);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    applyFiltersAndSort(location, searchTerm, sortOption);
  };

  // Toggle Favorite Logic
  const toggleFavorite = (id) => {
    let newFavorites = [...favorites];
    if (newFavorites.includes(id)) {
      newFavorites = newFavorites.filter(favId => favId !== id);
    } else {
      newFavorites.push(id);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero onSearch={handleSearch} />
      
      {/* Featured Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-serif text-luxury-dark text-center mb-6 tracking-wider">
          FEATURED ESTATES
        </h2>
        <p className="text-center text-luxury-grey max-w-xl mx-auto mb-10">
          Handpicked selection of the most exquisite properties across the globe.
        </p>

        {/* --- MAP VIEW (Updated to Leaflet) --- */}
        <div style={{ height: '50vh', width: '100%' }} className="mb-20 rounded-sm overflow-hidden shadow-lg border border-gray-100">
          <MapContainer center={[20.0, 0.0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {properties.map(p => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={customIcon}>
                <Popup>
                  <div className="font-sans text-sm">
                    <strong>{p.title}</strong><br />
                    ${p.price.toLocaleString()}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Filter and Sort UI */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex justify-center space-x-4">
            {['All', 'New York', 'Dubai'].map(loc => (
              <button 
                key={loc}
                onClick={() => handleFilter(loc)}
                className={`px-6 py-2 rounded-full border transition ${location === loc ? 'bg-luxury-gold text-white border-luxury-gold' : 'border-gray-300 hover:border-luxury-gold'}`}
              >
                {loc}
              </button>
            ))}
          </div>

          <select 
            onChange={(e) => handleSort(e.target.value)}
            className="border border-gray-300 rounded-full px-6 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold"
          >
            <option value="default">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAZ">Name: A-Z</option>
          </select>
        </div>
        
        {/* Compare Floating UI */}
        {comparing.length > 1 && (
            <div className="fixed bottom-10 right-10 z-50 bg-luxury-dark text-white p-6 rounded-sm shadow-2xl">
                <h4 className="font-semibold mb-2">Comparing {comparing.length} properties</h4>
                <Link to="/compare" className="bg-luxury-gold px-4 py-2 text-sm rounded">View Comparison</Link>
            </div>
        )}

        {/* Grid Container - Maps over filteredProperties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-luxury-grey">No properties found matching your criteria.</p>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-luxury-dark text-luxury-light py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif text-luxury-gold mb-6 tracking-wide">THE ART OF LIVING</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              With over 20 years of experience, we specialize in curating exceptional living spaces for the discerning clientele.
            </p>
            <button className="border border-luxury-gold text-luxury-gold px-8 py-3 hover:bg-luxury-gold hover:text-luxury-dark transition">
              Our Story
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1600585152220-90363fe88115?q=80&w=800" alt="Luxury interior" className="rounded-sm shadow-2xl" />
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-serif text-luxury-dark text-center mb-16 tracking-wider">CLIENT EXPERIENCES</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-luxury-light p-10 rounded-sm">
            <p className="text-gray-600 italic mb-6">"Luxury Estates provided a seamless experience in finding my penthouse in NYC. True professionals."</p>
            <p className="font-semibold text-luxury-dark">- John D.</p>
          </div>
          <div className="bg-luxury-light p-10 rounded-sm">
            <p className="text-gray-600 italic mb-6">"Unmatched service. They understood exactly what I needed for my villa in Dubai."</p>
            <p className="font-semibold text-luxury-dark">- Sarah K.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;