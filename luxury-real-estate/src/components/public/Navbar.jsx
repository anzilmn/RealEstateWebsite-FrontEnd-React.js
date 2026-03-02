import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth'; 

const Navbar = () => {
  const { user, logout } = useAuth(); 

  return (
    // Background stays dark, using border-bright-crimson to match theme
    <nav className="bg-luxury-black text-dark-red p-6 border-b border-bright-crimson sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif tracking-[0.3em] text-bright-crimson">
          LUXURY<span className="text-luxury-gold">ESTATES</span>
        </Link>
        
        {/* Expanded Nav Links */}
        <div className="hidden lg:flex space-x-8 text-[10px] uppercase tracking-[0.2em] text-white">
          <Link to="/" className="hover:text-luxury-gold transition duration-300">Home</Link>
          <Link to="/properties" className="hover:text-luxury-gold transition duration-300">Estates</Link>
          <Link to="/services" className="hover:text-luxury-gold transition duration-300">Services</Link>
          <Link to="/concierge" className="hover:text-luxury-gold transition duration-300">Concierge</Link>
          <Link to="/about" className="hover:text-luxury-gold transition duration-300">Our Story</Link>
          <Link to="/contact" className="hover:text-luxury-gold transition duration-300">Contact</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex space-x-6 items-center">
          {user ? (
            <div className="flex items-center space-x-6">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-[10px] uppercase border border-bright-crimson text-bright-crimson px-4 py-2 hover:bg-bright-crimson hover:text-white transition">
                  Admin Panel
                </Link>
              )}
              <span className="text-[10px] uppercase tracking-widest text-white">
                Hi, 
                <Link to="/profile" className="font-bold text-bright-crimson hover:text-luxury-gold transition ml-2">
                  {user.name}
                </Link>
              </span>
              <button 
                onClick={logout}
                className="text-[10px] uppercase text-white hover:text-bright-crimson transition opacity-70 hover:opacity-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              <Link to="/login" className="text-[10px] uppercase tracking-[0.2em] text-white hover:text-bright-crimson transition">
                Sign In
              </Link>
              <Link to="/signup" className="text-[10px] uppercase bg-luxury-gold text-black px-6 py-2.5 font-bold hover:bg-bright-crimson hover:text-white transition duration-500">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;