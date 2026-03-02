import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const loggedInUser = login(username, password);
    
    if (loggedInUser) {
      // --- REDIRECT LOGIC BASED ON ROLE ---
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // Regular users go to Home
      }
    } else {
      setError('Invalid credentials. Hint: use admin/admin or user/user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-dark px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-sm shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-serif text-center mb-8 text-luxury-dark tracking-tight">
          Welcome Back
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded mb-4 text-center border border-red-100">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-200 focus:border-luxury-gold outline-none transition rounded-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 focus:border-luxury-gold outline-none transition rounded-none"
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-luxury-dark text-white p-4 mt-8 font-semibold hover:bg-luxury-gold transition duration-300 uppercase text-xs tracking-widest">
          Sign In
        </button>

        <p className="text-center mt-6 text-gray-400 text-xs">
          Don't have an account? <span className="text-luxury-gold cursor-pointer">Register</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;