import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Center,
  Button,
  Modal
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import CategoryCard from '../components/CategoryCard';
import AddCategory from '../components/AddCategory';   

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();

  
  const getCategories = async () => {
    const token = localStorage.getItem('jwt');
    try {
      const res = await axiosInstance.get('/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

 
  const handleAddCategory = async (newCategory) => {
    const token = localStorage.getItem('jwt');
    try {
      await axiosInstance.post('/api/categories', newCategory, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setModalOpened(false);
      getCategories(); 
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Title order={2} align="center" mb="xl">
        Category List
      </Title>

      
      <Center mb="xl">
        <Button onClick={() => setModalOpened(true)} variant="filled" color="blue">
          Add New Category
        </Button>
      </Center>

      
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Add New Category" size="lg">
      <AddCategory
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            onCreate={handleAddCategory}
            isUpdateMode={false}
        />
      </Modal>

      
      {loading ? (
        <Text align="center">Loading categories...</Text>
      ) : (
        <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onDelete={() => getCategories()}
              onUpdate={() => getCategories()} 
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
