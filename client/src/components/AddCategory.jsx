import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';

const AddCategory = ({
  opened,
  onClose,
  isUpdateMode = false,
  selectedCategory = null,
  onCreate,
  onUpdate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isUpdateMode && selectedCategory) {
      setName(selectedCategory.name || '');
      setDescription(selectedCategory.description || '');
    } else if (!isUpdateMode && opened) {
      
      setName('');
      setDescription('');
    }
  }, [isUpdateMode, selectedCategory, opened]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Category name is required');
      return;
    }

    const categoryData = { name, description };

    if (isUpdateMode) {
      onUpdate && onUpdate(categoryData);
    } else {
      onCreate && onCreate(categoryData);
    }

    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isUpdateMode ? 'Update Category' : 'Add New Category'}
      size="lg"
    >
      <TextInput
        label="Name"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        mt="sm"
      />
      <TextInput
        label="Description"
        placeholder="Enter category description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mt="sm"
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {isUpdateMode ? 'Update' : 'Add'}
        </Button>
      </Group>
    </Modal>
  );
};

export default AddCategory;