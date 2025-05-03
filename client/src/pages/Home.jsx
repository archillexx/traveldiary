import { Container, Grid } from '@mantine/core';
import HeroSection from '../components/Hero';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Home({ authView }) {
  return (
    <main>
      <Container size="xl" py="xl">
        <Grid>
          {authView && (
            <Grid.Col span={{ base: 12, md: 5 }}>
              {authView === 'login' && <Login />}
              {authView === 'signup' && <Signup />}
            </Grid.Col>
          )}

          <Grid.Col span={{ base: 12, md: authView ? 7 : 12 }}>
            <HeroSection />
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}
