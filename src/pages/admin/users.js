import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Table,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  Select,
  Box,
  ThemeIcon,
  Card,
  Avatar,
  Menu,
  Alert
} from '@mantine/core';
import {
  IconUsers,
  IconEdit,
  IconTrash,
  IconPlus,
  IconArrowLeft,
  IconUser,
  IconMail,
  IconShield,
  IconDots,
  IconUserCheck,
  IconUserX,
  IconInfoCircle
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Users() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  // Usuarios simulados
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Simular carga de usuarios
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@example.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15',
          messagesCount: 145
        },
        {
          id: 2,
          name: 'María González',
          email: 'maria@example.com',
          role: 'user',
          status: 'active',
          lastLogin: '2024-01-14',
          messagesCount: 89
        },
        {
          id: 3,
          name: 'Carlos Rodríguez',
          email: 'carlos@example.com',
          role: 'moderator',
          status: 'inactive',
          lastLogin: '2024-01-10',
          messagesCount: 234
        },
        {
          id: 4,
          name: 'Ana Martínez',
          email: 'ana@example.com',
          role: 'user',
          status: 'active',
          lastLogin: '2024-01-15',
          messagesCount: 56
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [router]);

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
    setModalOpened(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setModalOpened(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Actualizar usuario existente
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: Date.now(),
        ...formData,
        lastLogin: 'Nunca',
        messagesCount: 0
      };
      setUsers(prev => [...prev, newUser]);
    }
    setModalOpened(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'red', label: 'Administrador' },
      moderator: { color: 'blue', label: 'Moderador' },
      user: { color: 'green', label: 'Usuario' }
    };
    const config = roleConfig[role] || roleConfig.user;
    return (
      <Badge color={config.color} variant="light" size="sm">
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'green', label: 'Activo' },
      inactive: { color: 'red', label: 'Inactivo' }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <Badge color={config.color} variant="light" size="sm">
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" color="blue">
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Text fw={500} size="sm">{user.name}</Text>
            <Text size="xs" c="dimmed">{user.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>{getRoleBadge(user.role)}</Table.Td>
      <Table.Td>{getStatusBadge(user.status)}</Table.Td>
      <Table.Td>
        <Text size="sm">{user.lastLogin}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{user.messagesCount}</Text>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={150}>
          <Menu.Target>
            <ActionIcon variant="light" size="sm">
              <IconDots size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item 
              leftSection={<IconEdit size={14} />}
              onClick={() => handleEditUser(user)}
            >
              Editar
            </Menu.Item>
            <Menu.Item 
              leftSection={user.status === 'active' ? <IconUserX size={14} /> : <IconUserCheck size={14} />}
              onClick={() => {
                const newStatus = user.status === 'active' ? 'inactive' : 'active';
                setUsers(prev => prev.map(u => 
                  u.id === user.id ? { ...u, status: newStatus } : u
                ));
              }}
            >
              {user.status === 'active' ? 'Desactivar' : 'Activar'}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={() => handleDeleteUser(user.id)}
            >
              Eliminar
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Head>
        <title>Gestión de Usuarios - Panel Administrativo</title>
        <meta name="description" content="Gestión de usuarios del sistema" />
      </Head>

      <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Header */}
        <Paper shadow="sm" p="md" mb="xl" style={{ borderBottom: '1px solid #e9ecef' }}>
          <Container size="xl">
            <Group justify="space-between">
              <Group>
                <ActionIcon 
                  variant="light" 
                  size="lg"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  <IconArrowLeft size={20} />
                </ActionIcon>
                <ThemeIcon size="lg" radius="md" variant="light">
                  <IconUsers size={24} />
                </ThemeIcon>
                <Box>
                  <Title order={2}>Gestión de Usuarios</Title>
                  <Text size="sm" c="dimmed">Administra los usuarios del sistema</Text>
                </Box>
              </Group>

              <Button
                leftSection={<IconPlus size={16} />}
                onClick={handleCreateUser}
              >
                Nuevo Usuario
              </Button>
            </Group>
          </Container>
        </Paper>

        <Container size="xl">
          <Stack gap="lg">
            {/* Estadísticas rápidas */}
            <Group grow>
              <Card shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Total Usuarios
                    </Text>
                    <Text fw={700} size="xl">{users.length}</Text>
                  </div>
                  <ThemeIcon color="blue" variant="light" size="lg">
                    <IconUsers size={20} />
                  </ThemeIcon>
                </Group>
              </Card>

              <Card shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Usuarios Activos
                    </Text>
                    <Text fw={700} size="xl">
                      {users.filter(u => u.status === 'active').length}
                    </Text>
                  </div>
                  <ThemeIcon color="green" variant="light" size="lg">
                    <IconUserCheck size={20} />
                  </ThemeIcon>
                </Group>
              </Card>

              <Card shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      Administradores
                    </Text>
                    <Text fw={700} size="xl">
                      {users.filter(u => u.role === 'admin').length}
                    </Text>
                  </div>
                  <ThemeIcon color="red" variant="light" size="lg">
                    <IconShield size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            </Group>

            {/* Tabla de usuarios */}
            <Paper shadow="sm" p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Lista de Usuarios</Title>
                <Badge color="blue" variant="light" size="lg">
                  {users.length} usuarios
                </Badge>
              </Group>

              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Usuario</Table.Th>
                    <Table.Th>Rol</Table.Th>
                    <Table.Th>Estado</Table.Th>
                    <Table.Th>Último Acceso</Table.Th>
                    <Table.Th>Mensajes</Table.Th>
                    <Table.Th>Acciones</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Paper>

            {/* Info adicional */}
            <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
              <Text size="sm">
                Los usuarios con rol "admin" tienen acceso completo al panel administrativo. 
                Los "moderadores" pueden gestionar contenido, y los "usuarios" solo tienen acceso básico.
              </Text>
            </Alert>
          </Stack>
        </Container>

        {/* Modal para crear/editar usuario */}
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          centered
        >
          <Stack gap="md">
            <TextInput
              label="Nombre completo"
              placeholder="Ingresa el nombre"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              leftSection={<IconUser size={16} />}
              required
            />

            <TextInput
              label="Email"
              placeholder="email@ejemplo.com"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              leftSection={<IconMail size={16} />}
              required
            />

            <Select
              label="Rol"
              placeholder="Selecciona un rol"
              value={formData.role}
              onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              data={[
                { value: 'user', label: 'Usuario' },
                { value: 'moderator', label: 'Moderador' },
                { value: 'admin', label: 'Administrador' }
              ]}
              leftSection={<IconShield size={16} />}
              required
            />

            <Select
              label="Estado"
              placeholder="Selecciona el estado"
              value={formData.status}
              onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              data={[
                { value: 'active', label: 'Activo' },
                { value: 'inactive', label: 'Inactivo' }
              ]}
              required
            />

            <Group justify="flex-end" gap="sm" mt="md">
              <Button variant="outline" onClick={() => setModalOpened(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveUser}>
                {editingUser ? 'Actualizar' : 'Crear'} Usuario
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Box>
    </>
  );
}
