import { useState } from 'react';
import { Alert, TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

export default function Login({setToken}) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const { email, password } = formData;
  
      try {
        const response = await axiosInstance.post('/api/auth/login', {
          email,
          password,
        });
  
        const { token } = response.data;
  
        // Store the token
        localStorage.setItem('jwt', token);
        setToken(token)
        // Redirect
        navigate('/destinations');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container size={420} my={40}>
        <Title align="center" mb="lg">
          Welcome Back
        </Title>
        <Paper withBorder shadow="md" p={30} radius="md">
          {error && <Alert color="red" mb="sm">{error}</Alert>}
          <form onSubmit={handleLogin}>
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              mb="sm"
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Your password"
              required
              value={formData.password}
              onChange={handleChange}
              mb="lg"
            />
            <Button fullWidth type="submit" loading={loading}>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }