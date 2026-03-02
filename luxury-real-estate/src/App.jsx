import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import PropertyDetails from './pages/public/PropertyDetails';
import ComparePage from './pages/ComparePage';
import ProfilePage from './pages/public/ProfilePage'; // --- Import Profile Page ---
import { AuthProvider } from './context/AuthProvider';
import { PropertyProvider } from './context/PropertyContext'; // Ensure this is imported

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AddProperty from './pages/admin/AddProperty';
import ManageProperties from './pages/admin/ManageProperties';

// --- Placeholder Components for Navbar Links ---
const ServicesPage = () => <div className="p-20 text-center text-rose-petal bg-luxury-black min-h-screen"><h2 className="text-4xl text-bright-crimson font-serif uppercase tracking-widest">Our Premium Services</h2><p className="mt-4">Exclusive real estate consultancy and portfolio management.</p></div>;
const ConciergePage = () => <div className="p-20 text-center text-rose-petal bg-luxury-black min-h-screen"><h2 className="text-4xl text-bright-crimson font-serif uppercase tracking-widest">Luxury Concierge</h2><p className="mt-4">Private jet charter, yacht rentals, and lifestyle management.</p></div>;
const AboutPage = () => <div className="p-20 text-center text-rose-petal bg-luxury-black min-h-screen"><h2 className="text-4xl text-bright-crimson font-serif uppercase tracking-widest">Our Story</h2><p className="mt-4">Crafting exceptional living experiences since 2024.</p></div>;
const ContactPage = () => (
    <div className="p-20 text-center text-rose-petal bg-luxury-black min-h-screen">
        <h2 className="text-4xl text-bright-crimson mb-8 font-serif uppercase tracking-widest">Contact Us</h2>
        <form className="max-w-md mx-auto space-y-4">
            <input type="text" placeholder="Name" className="w-full p-3 bg-luxury-dark border border-luxury-gray text-white" />
            <input type="email" placeholder="Email" className="w-full p-3 bg-luxury-dark border border-luxury-gray text-white" />
            <textarea placeholder="Message" className="w-full p-3 bg-luxury-dark border border-luxury-gray text-white" rows="4"></textarea>
            <button className="bg-bright-crimson text-white px-6 py-3 w-full hover:bg-red-700 transition">Send Message</button>
        </form>
    </div>
);

function App() {
  return (
    <AuthProvider>
      <PropertyProvider> {/* Wrap with PropertyProvider for context */}
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* --- Navbar Placeholder Routes --- */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/concierge" element={<ConciergePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-property" element={<AddProperty />} />
              <Route path="properties" element={<ManageProperties />} />
            </Route>
          </Routes>
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;