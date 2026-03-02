import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyCard = ({ property, isFavorite, onToggleFavorite, onToggleCompare }) => {
  
  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); // Prevents Link navigation
    onToggleFavorite(property.id); 
    
    // Toast notification
    if (isFavorite) {
      toast.info("Removed from favorites");
    } else {
      toast.success("Added to favorites!");
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation(); // Prevents Link navigation
    onToggleCompare(property);
    
    // Toast notification
    toast.info("Property added for comparison");
  };

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden group border border-gray-100 hover:shadow-lg transition relative">
      
      {/* Compare Checkbox */}
      <div className="absolute top-4 left-4 z-10 bg-white/70 p-2 rounded-full cursor-pointer">
        <input 
          type="checkbox" 
          onClick={handleCompareClick} 
          className="w-5 h-5 accent-luxury-gold cursor-pointer" 
          title="Add to Compare"
        />
      </div>

      {/* Favorite Heart Button */}
      <button 
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-10 bg-white/70 p-2 rounded-full text-2xl"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Navigation Link */}
      <Link to={`/property/${property.id}`} className="block">
        <img src={property.imageUrl} alt={property.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"/>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-luxury-dark mb-2 group-hover:text-luxury-gold transition">
            {property.title}
          </h3>
          <p className="text-luxury-gold text-2xl font-semibold mb-4">
            ${property.price.toLocaleString()}
          </p>
          
          <div className="flex justify-between text-sm text-luxury-grey border-t pt-4">
            <span>{property.beds} Beds</span>
            <span>{property.baths} Baths</span>
            <span>{property.sqft.toLocaleString()} Sqft</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;