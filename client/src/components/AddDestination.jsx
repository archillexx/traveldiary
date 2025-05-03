import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  MultiSelect,
  LoadingOverlay
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import axiosInstance from '../axiosConfig';
import axios from 'axios';

export default function AddDestination({ onClose, onSubmit, action, destination }) {
  const [destinationName, setDestinationName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coordError, setCoordError] = useState(false);

  useEffect(() => {
    if (destination) {
      setDestinationName(destination.destination || '');
      setDescription(destination.description || '');
      setDate(destination.date ? new Date(destination.date) : new Date());
      setPhotoUrl(destination.photoUrl || '');
      setLocation(destination.location || '');
      setLatitude(destination.latitude || '');
      setLongitude(destination.longitude || '');
      setSelectedCategories(destination.categories || []);
    }
  }, [destination]);

  const fetchCoordinates = async (loc) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(loc)}&format=json&limit=1`
      );
      if (res.data.length > 0) {
        setLatitude(res.data[0].lat);
        setLongitude(res.data[0].lon);
        setCoordError(false);
      } else {
        console.warn('No coordinates found');
        setLatitude('');
        setLongitude('');
        setCoordError(true);
      }
    } catch (err) {
      console.error('Error fetching coordinates:', err);
      setLatitude('');
      setLongitude('');
      setCoordError(true);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const res = await axiosInstance.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const categoryOptions = res.data.map((cat) => ({
          value: cat._id,
          label: cat.name
        }));
        setCategories(categoryOptions);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 2) {
      fetchCoordinates(value);
    } else {
      setLatitude('');
      setLongitude('');
    }
  };

  const handleSubmit = () => {
    const destinationData = {
      destination: destinationName,
      description,
      date: date.toISOString(),
      photoUrl,
      latitude,
      longitude,
      categories: selectedCategories,
    };
    onSubmit(destinationData);
    onClose();
  };

  const isFormReady = destinationName && date && photoUrl && latitude && longitude;

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Title"
        value={destinationName}
        onChange={(e) => setDestinationName(e.target.value)}
        required
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <DateInput
        label="Date"
        value={date}
        onChange={setDate}
        placeholder="Pick a date"
        maw={400}
        required
      />
      <TextInput
        label="Photo URL"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        required
      />
      <TextInput
        label="Location (used to get coordinates)"
        value={location}
        onChange={handleLocationChange}
        placeholder="e.g., Brisbane, Australia"
        required
        error={coordError ? 'Could not find coordinates for this location' : false}
      />
      <TextInput
        label="Latitude"
        value={latitude}
        readOnly
      />
      <TextInput
        label="Longitude"
        value={longitude}
        readOnly
      />
      <MultiSelect
        label="Categories"
        data={categories}
        value={selectedCategories}
        onChange={setSelectedCategories}
        placeholder="Select categories"
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isFormReady}>{action}</Button>
      </Group>
    </>
  );
}
