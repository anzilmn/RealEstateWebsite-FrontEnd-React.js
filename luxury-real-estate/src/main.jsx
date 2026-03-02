import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import { AuthProvider } from './context/AuthProvider.jsx';
// --- Ensure this path matches the provider file location ---
import { PropertyProvider } from './context/PropertyProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </AuthProvider>
  </React.StrictMode>,
)