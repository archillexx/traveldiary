import { useState, useEffect } from 'react';
import {
  Container,
  TextInput,
  Button,
  Title,
  Loader,
  Paper,
  Group,
  Notification
} from '@mantine/core';
import axiosInstance from '../axiosConfig';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('You must be logged in to view your profile.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    const token = localStorage.getItem('jwt');

    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container size="sm" mt="lg">
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container size="sm" my="xl">
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Title order={2} align="center" mb="md">
          Your Profile
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange('name')}
            required
            mb="sm"
          />

          <TextInput
            label="Email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange('email')}
            required
            type="email"
            mb="sm"
          />

          <TextInput
            label="University"
            placeholder="Your university"
            value={formData.university}
            onChange={handleChange('university')}
            mb="sm"
          />

          <TextInput
            label="Address"
            placeholder="Your address"
            value={formData.address}
            onChange={handleChange('address')}
            mb="md"
          />

          <Group position="center" mt="lg">
            <Button type="submit" loading={submitting} fullWidth>
              {submitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </Group>
        </form>

        {success && (
          <Notification mt="lg" color="green" title="Success">
            Profile updated successfully!
          </Notification>
        )}
      </Paper>
    </Container>
  );
}
