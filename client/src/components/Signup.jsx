import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import axiosInstance from '../axiosConfig';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axiosInstance.post('/api/auth/register', formData);
          alert('Registration successful. Please log in.');
          navigate('/login');
        } catch (error) {
          console.log(error.message)
          alert('Registration failed. Please try again.');
        }
      };

  return (
    <Container size={420} my={40}>
      <Title align="center" mb="lg">Create an Account</Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            mb="sm"
          />
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
          <Button fullWidth type="submit">Sign Up</Button>
        </form>
      </Paper>
    </Container>
  );
}
