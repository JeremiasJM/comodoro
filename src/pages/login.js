import React, { useState } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Box,
  Alert,
  Group,
  ThemeIcon,
  Card
} from '@mantine/core';
import {
  IconUser,
  IconLock,
  IconLogin,
  IconShield,
  IconAlertCircle
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulación de autenticación (usuario admin hardcodeado)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Simular delay de autenticación
      setTimeout(() => {
        // En un caso real, aquí guardarías el token en localStorage o cookies
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        router.push('/admin/dashboard');
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Credenciales incorrectas. Usuario: admin, Contraseña: admin123');
        setLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Head>
        <title>Iniciar Sesión - Panel Administrativo</title>
        <meta name="description" content="Acceso al panel administrativo del chatbot" />
      </Head>

      <Box
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <Container size="xs">
          <Stack gap="xl">
            {/* Header */}
            <Box ta="center">
              <ThemeIcon size={60} radius="50%" variant="light" color="white" mb="md">
                <IconShield size={32} />
              </ThemeIcon>
              <Title order={1} c="white" mb="xs">
                Panel Administrativo
              </Title>
              <Text c="gray.2" size="lg">
                Chatbot Comodoro Salud
              </Text>
            </Box>

            {/* Login Form */}
            <Paper shadow="xl" p="xl" radius="md" withBorder>
              <Stack gap="md">
                <Box ta="center" mb="md">
                  <Title order={2} size="h3" mb="xs">
                    Iniciar Sesión
                  </Title>
                  <Text size="sm" c="dimmed">
                    Accede al panel de administración
                  </Text>
                </Box>

                {error && (
                  <Alert 
                    icon={<IconAlertCircle size={16} />} 
                    color="red" 
                    variant="light"
                    radius="md"
                  >
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Stack gap="md">
                    <TextInput
                      label="Usuario"
                      placeholder="Ingresa tu usuario"
                      value={credentials.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      leftSection={<IconUser size={16} />}
                      size="md"
                      required
                    />

                    <PasswordInput
                      label="Contraseña"
                      placeholder="Ingresa tu contraseña"
                      value={credentials.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      leftSection={<IconLock size={16} />}
                      size="md"
                      required
                    />

                    <Button
                      type="submit"
                      loading={loading}
                      leftSection={<IconLogin size={16} />}
                      size="lg"
                      radius="md"
                      fullWidth
                      mt="md"
                      style={{
                        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Paper>

            {/* Info Card */}
            <Card p="md" radius="md" bg="rgba(255, 255, 255, 0.1)" style={{ backdropFilter: 'blur(10px)' }}>
              <Stack gap="xs">
                <Text size="sm" c="white" fw={500} ta="center">
                  Credenciales de prueba:
                </Text>
                <Group justify="center" gap="xl">
                  <Text size="xs" c="gray.2">
                    <strong>Usuario:</strong> admin
                  </Text>
                  <Text size="xs" c="gray.2">
                    <strong>Contraseña:</strong> admin123
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
