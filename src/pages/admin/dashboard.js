import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Stack,
  Group,
  Button,
  ThemeIcon,
  Badge,
  Progress,
  Box,
  SimpleGrid,
  ActionIcon,
  Menu,
  Avatar,
  Divider,
  Paper,
  RingProgress,
  Center
} from '@mantine/core';
import {
  IconUsers,
  IconMessages,
  IconTrendingUp,
  IconBrandWhatsapp,
  IconDeviceDesktop,
  IconClock,
  IconEye,
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUserPlus,
  IconMessageCircle,
  IconActivity,
  IconCalendar,
  IconPhone
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulación de datos del chatbot
  const [stats, setStats] = useState({
    totalUsers: 1248,
    totalMessages: 8432,
    webMessages: 5231,
    whatsappMessages: 3201,
    todayMessages: 127,
    avgResponseTime: '2.3s',
    activeUsers: 45,
    satisfactionRate: 94
  });

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Datos para gráficos simulados
  const weeklyData = [
    { day: 'Lun', messages: 145 },
    { day: 'Mar', messages: 189 },
    { day: 'Mié', messages: 167 },
    { day: 'Jue', messages: 203 },
    { day: 'Vie', messages: 178 },
    { day: 'Sáb', messages: 134 },
    { day: 'Dom', messages: 98 }
  ];

  return (
    <>
      <Head>
        <title>Dashboard - Panel Administrativo</title>
        <meta name="description" content="Panel de administración del chatbot" />
      </Head>

      <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Header del Dashboard */}
        <Paper shadow="sm" p="md" mb="xl" style={{ borderBottom: '1px solid #e9ecef' }}>
          <Container size="xl">
            <Group justify="space-between">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light">
                  <IconActivity size={24} />
                </ThemeIcon>
                <Box>
                  <Title order={2}>Panel Administrativo</Title>
                  <Text size="sm" c="dimmed">Chatbot Comodoro Salud</Text>
                </Box>
              </Group>

              <Group>
                <Button
                  leftSection={<IconUserPlus size={16} />}
                  variant="light"
                  onClick={() => router.push('/admin/users')}
                >
                  Gestionar Usuarios
                </Button>
                
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="light" size="lg">
                      <Avatar size="sm" color="blue">A</Avatar>
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Administrador</Menu.Label>
                    <Menu.Item leftSection={<IconSettings size={14} />}>
                      Configuración
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item 
                      leftSection={<IconLogout size={14} />}
                      color="red"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Container>
        </Paper>

        <Container size="xl">
          <Stack gap="xl">
            {/* Estadísticas Principales */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Total Usuarios
                    </Text>
                    <Text fw={700} size="xl">
                      {stats.totalUsers.toLocaleString()}
                    </Text>
                  </Box>
                  <ThemeIcon color="blue" variant="light" size="xl" radius="md">
                    <IconUsers size={28} />
                  </ThemeIcon>
                </Group>
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    +12% desde el mes pasado
                  </Text>
                  <Badge color="green" variant="light" size="sm">
                    +12%
                  </Badge>
                </Group>
              </Card>

              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Mensajes Totales
                    </Text>
                    <Text fw={700} size="xl">
                      {stats.totalMessages.toLocaleString()}
                    </Text>
                  </Box>
                  <ThemeIcon color="grape" variant="light" size="xl" radius="md">
                    <IconMessages size={28} />
                  </ThemeIcon>
                </Group>
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    +8% desde ayer
                  </Text>
                  <Badge color="green" variant="light" size="sm">
                    +8%
                  </Badge>
                </Group>
              </Card>

              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Usuarios Activos
                    </Text>
                    <Text fw={700} size="xl">
                      {stats.activeUsers}
                    </Text>
                  </Box>
                  <ThemeIcon color="teal" variant="light" size="xl" radius="md">
                    <IconEye size={28} />
                  </ThemeIcon>
                </Group>
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    En este momento
                  </Text>
                  <Badge color="teal" variant="light" size="sm">
                    Online
                  </Badge>
                </Group>
              </Card>

              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Tiempo Respuesta
                    </Text>
                    <Text fw={700} size="xl">
                      {stats.avgResponseTime}
                    </Text>
                  </Box>
                  <ThemeIcon color="orange" variant="light" size="xl" radius="md">
                    <IconClock size={28} />
                  </ThemeIcon>
                </Group>
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    Promedio
                  </Text>
                  <Badge color="green" variant="light" size="sm">
                    Excelente
                  </Badge>
                </Group>
              </Card>
            </SimpleGrid>

            {/* Gráficos y Métricas */}
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <Title order={4}>Mensajes por Canal</Title>
                    <Menu shadow="md" width={150}>
                      <Menu.Target>
                        <Button variant="light" size="sm" rightSection={<IconChevronDown size={14} />}>
                          Esta semana
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item>Hoy</Menu.Item>
                        <Menu.Item>Esta semana</Menu.Item>
                        <Menu.Item>Este mes</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  <SimpleGrid cols={2} spacing="xl" mb="xl">
                    <Box>
                      <Group justify="space-between" align="center">
                        <Group>
                          <ThemeIcon color="blue" variant="light" size="md">
                            <IconDeviceDesktop size={16} />
                          </ThemeIcon>
                          <Text fw={500}>Web Chat</Text>
                        </Group>
                        <Text fw={700} size="lg">{stats.webMessages.toLocaleString()}</Text>
                      </Group>
                      <Progress value={62} color="blue" size="sm" radius="xl" mt="xs" />
                      <Text size="xs" c="dimmed" mt="xs">62% del total</Text>
                    </Box>

                    <Box>
                      <Group justify="space-between" align="center">
                        <Group>
                          <ThemeIcon color="green" variant="light" size="md">
                            <IconBrandWhatsapp size={16} />
                          </ThemeIcon>
                          <Text fw={500}>WhatsApp</Text>
                        </Group>
                        <Text fw={700} size="lg">{stats.whatsappMessages.toLocaleString()}</Text>
                      </Group>
                      <Progress value={38} color="green" size="sm" radius="xl" mt="xs" />
                      <Text size="xs" c="dimmed" mt="xs">38% del total</Text>
                    </Box>
                  </SimpleGrid>

                  <Title order={5} mb="md">Actividad de la Semana</Title>
                  <SimpleGrid cols={7} spacing="xs">
                    {weeklyData.map((day, index) => (
                      <Box key={index} ta="center">
                        <Text size="xs" c="dimmed" mb="xs">{day.day}</Text>
                        <Box 
                          style={{ 
                            height: Math.max(20, (day.messages / 250) * 100),
                            backgroundColor: '#339af0',
                            borderRadius: '4px',
                            marginBottom: '4px'
                          }}
                        />
                        <Text size="xs" fw={500}>{day.messages}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  {/* Satisfacción */}
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Center>
                      <RingProgress
                        size={120}
                        thickness={8}
                        sections={[{ value: stats.satisfactionRate, color: 'green' }]}
                        label={
                          <Center>
                            <div>
                              <Text ta="center" fw={700} size="xl">{stats.satisfactionRate}%</Text>
                              <Text ta="center" size="xs" c="dimmed">Satisfacción</Text>
                            </div>
                          </Center>
                        }
                      />
                    </Center>
                    <Text ta="center" mt="md" size="sm" c="dimmed">
                      Basado en feedback de usuarios
                    </Text>
                  </Card>

                  {/* Actividad Reciente */}
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={5} mb="md">Actividad Reciente</Title>
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Group gap="xs">
                          <ThemeIcon size="sm" color="blue" variant="light">
                            <IconMessageCircle size={12} />
                          </ThemeIcon>
                          <Text size="sm">Nueva consulta</Text>
                        </Group>
                        <Text size="xs" c="dimmed">Hace 2 min</Text>
                      </Group>
                      
                      <Group justify="space-between">
                        <Group gap="xs">
                          <ThemeIcon size="sm" color="green" variant="light">
                            <IconPhone size={12} />
                          </ThemeIcon>
                          <Text size="sm">WhatsApp mensaje</Text>
                        </Group>
                        <Text size="xs" c="dimmed">Hace 5 min</Text>
                      </Group>
                      
                      <Group justify="space-between">
                        <Group gap="xs">
                          <ThemeIcon size="sm" color="orange" variant="light">
                            <IconUsers size={12} />
                          </ThemeIcon>
                          <Text size="sm">Usuario registrado</Text>
                        </Group>
                        <Text size="xs" c="dimmed">Hace 12 min</Text>
                      </Group>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Mensajes de Hoy */}
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Mensajes de Hoy</Title>
                <Badge color="blue" variant="light" size="lg">
                  {stats.todayMessages} mensajes
                </Badge>
              </Group>
              
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <Box ta="center" p="md" bg="blue.0" radius="md">
                  <IconMessageCircle size={32} color="#339af0" />
                  <Text fw={700} size="xl" mt="xs">89</Text>
                  <Text size="sm" c="dimmed">Consultas Generales</Text>
                </Box>
                
                <Box ta="center" p="md" bg="green.0" radius="md">
                  <IconActivity size={32} color="#51cf66" />
                  <Text fw={700} size="xl" mt="xs">23</Text>
                  <Text size="sm" c="dimmed">Emergencias</Text>
                </Box>
                
                <Box ta="center" p="md" bg="orange.0" radius="md">
                  <IconCalendar size={32} color="#ff922b" />
                  <Text fw={700} size="xl" mt="xs">15</Text>
                  <Text size="sm" c="dimmed">Citas Médicas</Text>
                </Box>
              </SimpleGrid>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
