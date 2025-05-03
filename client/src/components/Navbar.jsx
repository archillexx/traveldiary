import {
    Container,
    Group,
    Burger,
    Button,
    Image,
    Drawer,
    Stack,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import { Link, useNavigate } from 'react-router-dom';
  import logo from '../assets/logo.png';
  
  function Navbar({ setAuthView, token, setToken }) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('jwt');
      setToken(null);
      navigate('/');
    };
  
    return (
      <header style={{ borderBottom: '1px solid #eee' }}>
        <Container
          size="xl"
          py="sm"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
          }}
        >
          <Link to="/">
            <Image src={logo} alt="Logo" height={40} />
          </Link>
  
          {/* Desktop View */}
          <Group visibleFrom="sm" spacing="md">
            {token ? (
              <>
                <Button component={Link} to="/destinations" variant="subtle">
                  Destinations
                </Button>
                <Button component={Link} to="/categories" variant="subtle">
                  Categories
                </Button>
                <Button component={Link} to="/profile" variant="subtle">
                  Profile
                </Button>
                <Button color="red" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="default" onClick={() => setAuthView('login')}>
                  Login
                </Button>
                <Button component={Link} to="/signup" onClick={() => setAuthView('signup')}>
                  Sign up
                </Button>
              </>
            )}
          </Group>
  
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
  
          {/* Mobile Drawer */}
          <Drawer
            opened={opened}
            onClose={close}
            title="Menu"
            padding="md"
            size="xs"
            hiddenFrom="sm"
          >
            <Stack spacing="md">
              {token ? (
                <>
                  <Button component={Link} to="/destinations" onClick={close}>
                    Destinations
                  </Button>
                  <Button component={Link} to="/categories" onClick={close}>
                    Categories
                  </Button>
                  <Button component={Link} to="/profile" onClick={close}>
                    Profile
                  </Button>
                  <Button color="red" variant="outline" onClick={() => { handleLogout(); close(); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" onClick={() => { setAuthView('login'); close(); }}>
                    Login
                  </Button>
                  <Button component={Link} to="/signup" onClick={() => { setAuthView('signup'); close(); }}>
                    Sign up
                  </Button>
                </>
              )}
            </Stack>
          </Drawer>
        </Container>
      </header>
    );
  }
  
  export default Navbar;
  