import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Center,
  Pagination,
} from '@mantine/core';
import axiosInstance from '../axiosConfig';
import DestinationCard from '../components/DestinationCard';

export default function PublicDestinationPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllDestinations = async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/api/destinations/all?page=${page}&limit=4`);
      setDestinations(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error('Error fetching all destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllDestinations(currentPage);
  }, [currentPage]);

  return (
    <Container size="xl" py="xl">
      <Title order={2} align="center" mb="xl">
        Explore Public Destinations
      </Title>

      {loading ? (
        <Text align="center">Loading destinations...</Text>
      ) : destinations.length > 0 ? (
        <>
          <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {destinations.map((dest) => (
              <DestinationCard key={dest._id} destination={dest} />
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
      ) : (
        <Text align="center">No destinations available.</Text>
      )}
    </Container>
  );
}
