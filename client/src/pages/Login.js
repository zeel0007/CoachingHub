import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, signupUser } from '../services/api';
import { AlertTriangle } from 'lucide-react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await loginUser({ email: formData.email, password: formData.password });
      } else {
        response = await signupUser(formData);
      }

      if (response.success) {
        login(response.user);
        navigate('/'); // Redirect to home on success
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container py-12 page-enter flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="card p-8 bg-white border-t-4 border-t-primary-500 shadow-xl">
          <div className="text-center mb-8">
            <img src="/channels4_profile.jpg" alt="Logo" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back!' : 'Create an Account'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isLogin ? 'Login to continue your preparation' : 'Join thousands of aspirants today'}
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center py-3 text-lg mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="font-bold text-primary-600 hover:text-primary-800 transition-colors"
            >
              {isLogin ? 'Sign up for free' : 'Login here'}
            </button>
          </div>

          {/* Demo Note */}
          <div className="mt-6 bg-blue-50 p-3 rounded text-xs text-blue-800 text-center">
            <strong>Demo Mode:</strong> You can use fake details. If MongoDB is not running, data is saved in-memory and will reset on server restart.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
