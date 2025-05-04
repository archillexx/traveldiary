import React, { useState } from 'react';
import { Paper, Title, Text, Textarea, TextInput, Button, Modal, Divider } from '@mantine/core';
import axiosInstance from '../axiosConfig';

export default function CategoryCard({ category, onDelete, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({
    name: category.name,
    description: category.description,
  });

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      console.error('No token found, unauthorized request');
      return;
    }

    try {
      await axiosInstance.put(`/api/categories/${category._id}`, updatedCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdate(); 
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      console.error('No token found, unauthorized request');
      return;
    }

    try {
      await axiosInstance.delete(`/api/categories/${category._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <Paper shadow="sm" p="md" withBorder style={{ textAlign: 'center' }}>
      <Title order={4}>{category.name}</Title>
      <Text color="dimmed" mt="sm">{category.description}</Text>

      <Button variant="outline" color="blue" onClick={() => setIsEditModalOpen(true)} mt="md">
        Edit
      </Button>
      <Button variant="outline" color="red" onClick={handleDelete} mt="md" ml="sm">
        Delete
      </Button>

      <Modal opened={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Category">
        <TextInput
          label="Name"
          value={updatedCategory.name}
          onChange={(e) => setUpdatedCategory({ ...updatedCategory, name: e.target.value })}
        />
        <Textarea
          label="Description"
          value={updatedCategory.description}
          onChange={(e) => setUpdatedCategory({ ...updatedCategory, description: e.target.value })}
        />
        <Button onClick={handleEditSubmit} color="green" mt="md">
          Save Changes
        </Button>
      </Modal>

      <Divider my="sm" />
    </Paper>
  );
}
 