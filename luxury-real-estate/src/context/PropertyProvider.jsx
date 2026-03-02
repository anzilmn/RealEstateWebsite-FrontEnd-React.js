import { useState } from 'react';
// --- FIX: Add curly braces around PropertyContext ---
import { PropertyContext } from './PropertyContext'; // Assuming you named the context file PropertyContext.jsx

export const PropertyProvider = ({ children }) => {
    const [comparing, setComparing] = useState([]);

    const toggleCompare = (property) => {
        if (comparing.find(p => p.id === property.id)) {
            setComparing(comparing.filter(p => p.id !== property.id));
        } else if (comparing.length < 3) {
            setComparing([...comparing, property]);
        } else {
            alert("You can only compare up to 3 properties.");
        }
    };

    return (
        <PropertyContext.Provider value={{ comparing, toggleCompare }}>
            {children}
        </PropertyContext.Provider>
    );
};