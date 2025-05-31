import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, fetchCurrentUser } from '../features/auth/authSlice';
import type { RootState, AppDispatch } from '../app/store';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      const userResult = await dispatch(fetchCurrentUser());
      if (fetchCurrentUser.fulfilled.match(userResult)) {
        const role = userResult.payload.role;
        navigate(role === 'ADMIN' ? '/dashboard' : '/shop');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="name" type="text" placeholder="Name" autoComplete="name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" autoComplete="email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" autoComplete="new-password" onChange={handleChange} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  );
};

export default Register;
