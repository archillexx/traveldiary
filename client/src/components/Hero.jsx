import { Container, Title, Text, Button, Group, Image, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.svg'; 
export default function HeroSection() {
  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#ffffff' ,width:'100%'}}>
      <Container size="xl" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <Stack style={{ flex: 1, minWidth: 300 }}>
          <Title order={1} size="3rem" fw={700} lh={1.2}>
            Travel Diary
          </Title>
          <Text size="lg" c="dimmed" mt="md">
            A place to log your travel destinations and experiences. Share your journey with the world and explore stories from fellow travelers.
          </Text>

         
        </Stack>

        <div style={{ flex: 1, minWidth: 300 }}>
          <Image src={heroImg} alt="Travel illustration" radius="md" />
        </div>
      </Container>
    </section>
  );
}
