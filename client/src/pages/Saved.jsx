import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import DestinationCard from '../components/DestinationCard';

import {
  SimpleGrid,
  Loader,
  Title,
  Text,
  Pagination,
  Center,
  Container,
} from '@mantine/core';

export default function Saved() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('jwt');

  
  useEffect(() => {
    const fetchSaved = async (page = 1) => {
      try {
        const res = await axiosInstance.get(`/api/destinations/saved?page=${page}&limit=4`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSaved(res.data.data); 
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, [token]);
 

  if (loading) return <Loader />;

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="md">Your Saved Destinations</Title>
      {saved.length === 0 ? (
        <Text color="dimmed">You haven’t saved any destinations yet.</Text>
      ) : (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {saved.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </SimpleGrid>

          <Center mt="xl">
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={totalPages}
              radius="xl"
              withEdges
            />
          </Center>
        </>
      )}
    </Container>
  );
}
