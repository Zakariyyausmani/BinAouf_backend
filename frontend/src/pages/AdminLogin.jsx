import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    const result = await login(username, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Bin Aouf Admin</h2>
        <p className="admin-login-sub">Sign in to manage quote requests, products, and site configurations.</p>
        
        {error && <div className="admin-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="form-submit"
            style={{ marginTop: '10px' }}
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
