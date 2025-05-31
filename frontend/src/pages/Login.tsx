import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchCurrentUser } from '../features/auth/authSlice';
import type { RootState, AppDispatch } from '../app/store';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      const userResult = await dispatch(fetchCurrentUser());
      if (fetchCurrentUser.fulfilled.match(userResult)) {
        const role = userResult.payload.role;
        navigate(role === 'ADMIN' ? '/dashboard' : '/shop');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="email" type="email" placeholder="Email" autoComplete="email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" autoComplete="current-password" onChange={handleChange} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </form>
  );
};

export default Login;
