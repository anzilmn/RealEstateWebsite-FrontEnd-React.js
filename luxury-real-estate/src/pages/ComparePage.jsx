import Navbar from '../components/public/Navbar';
import { Link } from 'react-router-dom';
// --- NEW IMPORT ---
import { usePropertyContext } from '../hooks/usePropertyContext';

const ComparePage = () => {
    // --- UPDATED: Use context to get selected properties ---
    const { comparing: propertiesToCompare } = usePropertyContext(); 

    if (propertiesToCompare.length === 0) {
        return (
            <div className="text-center mt-20">
                <h1 className="text-3xl font-serif">No Properties Selected</h1>
                <p className="text-gray-600 mb-6">Select at least two properties from the homepage to compare.</p>
                <Link to="/" className="text-luxury-gold underline">Go back to explore</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-6 py-20">
                <h1 className="text-4xl font-serif text-luxury-dark text-center mb-16 tracking-wider">
                    PROPERTY COMPARISON
                </h1>
                
                {/* Comparison Table */}
                <div className="overflow-x-auto shadow-sm rounded-sm border">
                    <table className="w-full text-left">
                        <thead className="bg-luxury-light">
                            <tr>
                                <th className="p-6">Feature</th>
                                {propertiesToCompare.map(p => (
                                    <th key={p.id} className="p-6 text-center">
                                        <img src={p.imageUrl} alt={p.title} className="w-32 h-20 object-cover mx-auto rounded-sm mb-4" />
                                        {p.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="p-6 font-semibold text-luxury-dark">Price</td>
                                {propertiesToCompare.map(p => (
                                    <td key={p.id} className="p-6 text-center text-luxury-gold font-bold">
                                        ${p.price.toLocaleString()}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-t">
                                <td className="p-6 font-semibold text-luxury-dark">Location</td>
                                {propertiesToCompare.map(p => (
                                    <td key={p.id} className="p-6 text-center text-gray-600">{p.location}</td>
                                ))}
                            </tr>
                            <tr className="border-t">
                                <td className="p-6 font-semibold text-luxury-dark">Bedrooms</td>
                                {propertiesToCompare.map(p => (
                                    <td key={p.id} className="p-6 text-center text-gray-600">{p.beds}</td>
                                ))}
                            </tr>
                            <tr className="border-t">
                                <td className="p-6 font-semibold text-luxury-dark">Bathrooms</td>
                                {propertiesToCompare.map(p => (
                                    <td key={p.id} className="p-6 text-center text-gray-600">{p.baths}</td>
                                ))}
                            </tr>
                            <tr className="border-t">
                                <td className="p-6 font-semibold text-luxury-dark">Sq Ft</td>
                                {propertiesToCompare.map(p => (
                                    <td key={p.id} className="p-6 text-center text-gray-600">{p.sqft.toLocaleString()}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="text-center mt-10">
                    <Link to="/" className="text-luxury-gold underline">Back to Homepage</Link>
                </div>
            </div>
        </div>
    );
};

export default ComparePage;