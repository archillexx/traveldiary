import { useState, useEffect } from 'react';
import {
  Paper,
  Container,
  Title,
  Text,
  SimpleGrid,
  Center,
  Button,
  Modal,
  Group,
  Pagination,
} from '@mantine/core';
import axiosInstance from '../axiosConfig';
import DestinationCard from '../components/DestinationCard';
import AddDestination from '../components/AddDestination';

export default function DestinationPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destinationModalOpened, setDestinationModalOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getDestinations = async (page = 1) => {
    const token = localStorage.getItem('jwt');
    try {
      const res = await axiosInstance.get(`/api/destinations?page=${page}&limit=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDestinations(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getDestinations(currentPage);
  }, [currentPage]);

  const handleAddDestination = async (newDestination) => {
    const token = localStorage.getItem('jwt');
    try {
      await axiosInstance.post('/api/destinations', newDestination, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getDestinations(currentPage);
      setDestinationModalOpened(false);
    } catch (err) {
      console.error('Error adding destination:', err);
    }
  };

  

  return (
    <Container size="xl" py="xl">
      <Title order={2} align="center" mb="xl">
        Travel Diary Destinations
      </Title>

      {/* Action Buttons */}
      <Center mb="xl">
        <Group>
          <Button onClick={() => setDestinationModalOpened(true)} variant="filled" color="blue">
            Add New Destination
          </Button>
        </Group>
      </Center>

      {/* Add Destination Modal */}
      <Modal
        opened={destinationModalOpened}
        onClose={() => setDestinationModalOpened(false)}
        title="Add New Destination"
        size="lg"
      >
        <AddDestination
          onClose={() => setDestinationModalOpened(false)}
          onSubmit={handleAddDestination}
          action="Add"
        />
      </Modal>

      {loading ? (
        <Text align="center">Loading destinations...</Text>
      ) : destinations.length > 0 ? (
        <>
          <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {destinations.map((dest) => (
          <DestinationCard
              key={dest._id}
              destination={dest}
              onDelete={() => getDestinations(currentPage)} // refresh after delete
              onUpdate={() => getDestinations(currentPage)} // refresh after update
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
      ) : (
        <Text align="center">No destinations found.</Text>
      )}
    </Container>
  );
}
