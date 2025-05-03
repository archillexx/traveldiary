import { Grid, Container } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import HeroSection from '../components/Hero';

export default function AuthPage({ onLoginSuccess,setToken }) {
  const location = useLocation();

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 5 }}>
          {location.pathname === '/login' ? (
            <Login onLoginSuccess={onLoginSuccess} setToken={setToken} />
          ) : (
            <Signup />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <HeroSection />
        </Grid.Col>
      </Grid>
    </Container>
  );
}