import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // In Phase 1, we might just mock this or hit the backend if it's running
      const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(data, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground flex pt-20">
      
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1000" 
          alt="Travel" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background dark:to-darkBackground"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-textPrimary dark:text-white mb-2">Welcome Back</h2>
            <p className="text-textSecondary dark:text-gray-400 text-sm">Sign in to manage your bookings and trips.</p>
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-12 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs font-bold text-accent hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-accent/40 flex justify-center items-center space-x-2 mt-4 disabled:opacity-70"
            >
              <span>{loading ? 'Logging in...' : 'Log In'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-textSecondary dark:text-gray-400">
            Don't have an account? <Link to="/signup" className="text-accent font-bold hover:underline">Sign up</Link>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Login;