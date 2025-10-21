import { useState } from "react";
import { X, Twitter, Eye, EyeOff } from 'lucide-react';

// Auth Modal Component
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (mode === 'signup') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log(`${mode === 'login' ? 'Login' : 'Signup'} successful:`, formData);
      // Reset form and close
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      onClose();
    }, 1500);
  };

  const handleTwitterAuth = async() => {
     try {
      // const response = await fetch('https://xcallback-backend.onrender.com/auth');
      // const data = await response.json();
      
      // // Redirect to Twitter OAuth URL
      // if (data.oauth_url) {
      //   window.location.href = data.oauth_url;
      // }

      // Step 1: Generate PKCE challenge
    async function generatePKCE() {
      function base64URLEncode(str) {
        return btoa(String.fromCharCode(...new Uint8Array(str)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }

      async function sha256(buffer) {
        return await crypto.subtle.digest('SHA-256', buffer);
      }

      const code_verifier = base64URLEncode(crypto.getRandomValues(new Uint8Array(32)));
      const code_challenge = base64URLEncode(await sha256(new TextEncoder().encode(code_verifier)));

          localStorage.setItem('code_verifier', code_verifier);
          return code_challenge;
        }

        // Step 2: Call backend to get auth URL
        const code_challenge = await generatePKCE();
        const res = await fetch(`https://xcallback-backend.onrender.com/auth?code_challenge=${code_challenge}`);
        const data = await res.json();

        // Step 3: Redirect user to X login page
        window.location.href = data.oauth_url;

        
    } catch (error) {
      console.error('Error initiating OAuth:', error);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
      {/* Blur Background */}
      <div 
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
        {/* Header */}
        <div className="sticky top-0 px-6 py-2 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Twitter Auth Button */}
          <button
            onClick={handleTwitterAuth}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold transition-colors mb-6"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
          >
            Sign {mode === 'login' ? 'in' : 'up'} with X
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1" style={{ borderTop: '1px solid var(--border-color)' }}></div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>or continue with email</span>
            <div className="flex-1" style={{ borderTop: '1px solid var(--border-color)' }}></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className={`w-full px-4 py-3 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  borderColor: errors.username ? undefined : 'var(--border-color)'
                }}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email Field (Signup only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    borderColor: errors.email ? undefined : 'var(--border-color)'
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    borderColor: errors.password ? undefined : 'var(--border-color)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={toggleMode}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          {/* Terms */}
          <p className="text-center text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;