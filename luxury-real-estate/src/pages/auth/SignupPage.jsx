import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- SIMULATED BACKEND: Save to localStorage ---
    const newUser = {
      ...formData,
      role: 'user', // Default new signups to 'user' role
      id: Date.now()
    };

    // Get existing users or start new array
    const existingUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.find(u => u.email === formData.email)) {
      alert('Email already registered!');
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(existingUsers));

    alert('Account created successfully! You can now login.');
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-dark p-4">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-serif text-center mb-2 text-luxury-dark tracking-wider">
          REGISTER
        </h2>
        <p className="text-center text-luxury-grey mb-8 font-light italic">Access exclusive luxury listings.</p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold transition"
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold transition"
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold transition"
            required
          />
        </div>
        
        <button type="submit" className="w-full bg-luxury-dark text-white p-4 mt-6 font-semibold hover:bg-luxury-gold transition duration-300 uppercase tracking-widest text-sm">
          Create Account
        </button>

        <p className="text-center text-luxury-grey mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-luxury-gold hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;