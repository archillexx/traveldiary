import React, { useState } from 'react';
import { Image, Text, Divider, Title, Paper, Button, Modal, TextInput, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axiosInstance from '../axiosConfig';

export default function DestinationCard({ destination, onDelete, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedDestination, setUpdatedDestination] = useState({
    destinationName: destination.destination,
    description: destination.description,
    photoUrl: destination.photoUrl || '',
    date: new Date(destination.date),
    location: destination.location || '',
    latitude: destination.latitude || '',
    longitude: destination.longitude || '',
    categories: destination.categories.map((category) => category._id),
  });

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No token found, unauthorized request');
      return;
    }

    try {
      const updatedData = {
        destination: updatedDestination.destinationName,
        description: updatedDestination.description,
        photoUrl: updatedDestination.photoUrl,
        location: updatedDestination.location,
        latitude: updatedDestination.latitude,
        longitude: updatedDestination.longitude,
        date: updatedDestination.date.toISOString(),
        categories: updatedDestination.categories,
      };

      await axiosInstance.put(`/api/destinations/${destination._id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdate();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating destination:', err);
    }
  };

  const handleDelete = async () => {
    console.log(destination._id)
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No token found, unauthorized request');
      return;
    }

    try {
      await axiosInstance.delete(`/api/destinations/${destination._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete();
    } catch (err) {
      console.error('Error deleting destination:', err);
    }
  };

  // Link to Google Maps or OpenStreetMap
  const mapLink = `https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`;

  return (
    <Paper shadow="sm" p="md" withBorder style={{ textAlign: 'center' }}>
      <Title order={4}>{destination.destination}</Title>

      <Text size="sm" color="dimmed">{destination.location}</Text>

      {destination.latitude && destination.longitude && (
        <Text size="xs" color="gray">
          Lat: {destination.latitude}, Lng: {destination.longitude}
        </Text>
      )}

      {destination.photoUrl && (
        <Image
          src={destination.photoUrl}
          alt={destination.destination}
          radius="md"
          my="sm"
          height={200}
          fit="cover"
        />
      )}

      <Text mt="sm">{destination.description}</Text>

      {destination.date && (
        <Text size="xs" color="dimmed" mt="xs">
          Date: {new Date(destination.date).toLocaleDateString()}
        </Text>
      )}

      {destination.categories && destination.categories.length > 0 && (
        <Text size="sm" color="blue" mt="xs">
          Categories: {destination.categories.map((category) => category.name).join(', ')}
        </Text>
      )}

      {/* Add the map link here */}
      {destination.latitude && destination.longitude && (
        <Button
          variant="outline"
          color="blue"
          component="a"
          href={mapLink}
          target="_blank"
          mt="md"
        >
          View on Map
        </Button>
      )}

      <Button variant="outline" color="blue" onClick={() => setIsEditModalOpen(true)} mt="md">
        Edit
      </Button>
      <Button variant="outline" color="red" onClick={handleDelete} mt="md">
        Delete
      </Button>

      {/* Edit Modal */}
      <Modal opened={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Destination">
        <TextInput
          label="Title"
          value={updatedDestination.destinationName}
          onChange={(e) => setUpdatedDestination({ ...updatedDestination, destinationName: e.target.value })}
        />
        <Textarea
          label="Description"
          value={updatedDestination.description}
          onChange={(e) => setUpdatedDestination({ ...updatedDestination, description: e.target.value })}
        />
        <TextInput
          label="Photo URL"
          value={updatedDestination.photoUrl}
          onChange={(e) => setUpdatedDestination({ ...updatedDestination, photoUrl: e.target.value })}
        />
        <TextInput
          label="Location (City, Country)"
          value={updatedDestination.location}
          onChange={(e) => setUpdatedDestination({ ...updatedDestination, location: e.target.value })}
        />
        <TextInput
          label="Latitude"
          value={updatedDestination.latitude}
          onChange={(e) => setUpdatedDestination({ ...updatedDestination, latitude: e.target.value })}
        />
        <TextInput
          label="Longitude"
          value={updatedDestination.longitude}
          onChange={(e) => setUpdatedDestination({ ...updatedDestination, longitude: e.target.value })}
        />
        <DatePicker
          label="Date"
          value={updatedDestination.date}
          onChange={(date) => setUpdatedDestination({ ...updatedDestination, date })}
        />
        <Button variant="filled" color="green" onClick={handleEditSubmit} mt="md">
          Save Changes
        </Button>
      </Modal>

      <Divider my="sm" />
    </Paper>
  );
}
