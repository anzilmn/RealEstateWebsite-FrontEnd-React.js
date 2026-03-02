import { useState } from 'react';
import Navbar from '../../components/public/Navbar';
import PropertyCard from '../../components/public/PropertyCard';
import { useAuth } from '../../context/AuthContextObject';
import { properties } from '../../data/properties';
import { usePropertyContext } from '../../hooks/usePropertyContext';

const ProfilePage = () => {
    // --- FIX: Removed unused 'login' ---
    const { user } = useAuth();
    const propertyContext = usePropertyContext(); 
    const toggleCompare = propertyContext ? propertyContext.toggleCompare : () => {};
    
    // --- FIX: Initialize state directly from 'user' object if it exists ---
    const [profilePic, setProfilePic] = useState(user?.profilePic || 'https://via.placeholder.com/150');
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    // Get favorites from localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteProperties = properties.filter(p => favoriteIds.includes(p.id));

    // --- NOTE: useEffect removed to fix performance issue ---

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name, email, profilePic };
        
        // Save to localStorage
        localStorage.setItem('current_user', JSON.stringify(updatedUser));
        
        alert('Profile Updated!');
        window.location.reload(); // Quick refresh to show changes
    };

    if (!user) {
        return <div className="text-center mt-20 text-neon-lime bg-luxury-black min-h-screen pt-20">Please log in to view your profile.</div>;
    }

    return (
        <div className="bg-luxury-black min-h-screen text-lime-green">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                
                {/* --- Profile Update Form Section --- */}
                <div className="bg-luxury-dark p-8 rounded-sm shadow-sm border border-luxury-gray mb-10 flex flex-col md:flex-row gap-8 items-center">
                    <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full border-4 border-neon-lime object-cover" />
                    
                    <form onSubmit={handleUpdateProfile} className="flex-1 space-y-4 w-full">
                        <h1 className="text-3xl font-serif text-neon-lime tracking-widest uppercase">Welcome, {user.name}</h1>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full p-3 bg-luxury-black border border-luxury-gray text-white"
                        />
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-3 bg-luxury-black border border-luxury-gray text-white"
                        />
                        <input 
                            type="text" 
                            value={profilePic} 
                            onChange={(e) => setProfilePic(e.target.value)}
                            placeholder="Profile Picture URL"
                            className="w-full p-3 bg-luxury-black border border-luxury-gray text-white"
                        />
                        <button type="submit" className="bg-neon-lime text-black px-6 py-3 font-bold hover:bg-white transition">
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* --- Favorites Section --- */}
                <h2 className="text-2xl font-serif text-white mb-6 uppercase tracking-widest">Your Favorite Properties</h2>
                
                {favoriteProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {favoriteProperties.map((property) => (
                            <PropertyCard 
                                key={property.id} 
                                property={property}
                                isFavorite={true}
                                onToggleFavorite={() => {}} 
                                onToggleCompare={toggleCompare}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-lime-green bg-luxury-dark p-6 border border-luxury-gray">You haven't added any favorites yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;