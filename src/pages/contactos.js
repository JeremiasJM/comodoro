import { Container, Title, Text, Box, Stack, Card, Group, ThemeIcon, Button, SimpleGrid } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconClock, IconAlertTriangle } from '@tabler/icons-react';

const contactInfo = [
  {
    icon: IconPhone,
    title: "Teléfono de Emergencia",
    content: "911",
    description: "Disponible 24/7 para emergencias médicas",
    color: "red"
  },
  {
    icon: IconPhone,
    title: "Línea de Consultas",
    content: "+54 381 123-4567",
    description: "Lunes a Viernes, 8:00 - 20:00",
    color: "blue"
  },
  {
    icon: IconMail,
    title: "Email",
    content: "consultas@healthassistant.com",
    description: "Respuesta en 24-48 horas",
    color: "green"
  },
  {
    icon: IconMapPin,
    title: "Ubicación",
    content: "Centro de Salud Principal",
    description: "Av. Salud 123, Ciudad",
    color: "violet"
  }
];

export default function Contactos() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box ta="center">
          <Title order={1} size="h1" mb="md">
            Contactos
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Encuentra la información de contacto para diferentes tipos de consultas y emergencias
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {contactInfo.map((contact, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Group mb="md">
                <ThemeIcon size="xl" radius="md" variant="light" color={contact.color}>
                  <contact.icon size={28} />
                </ThemeIcon>
                <Box>
                  <Title order={4}>{contact.title}</Title>
                  <Text fw={600} size="lg" c={contact.color}>
                    {contact.content}
                  </Text>
                </Box>
              </Group>
              <Text size="sm" c="dimmed">
                {contact.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        <Card shadow="sm" padding="xl" radius="md" withBorder bg="red.0">
          <Group>
            <ThemeIcon size="xl" radius="md" color="red">
              <IconAlertTriangle size={32} />
            </ThemeIcon>
            <Box flex={1}>
              <Title order={3} c="red">Emergencias Médicas</Title>
              <Text size="sm" mb="md">
                Si estás experimentando una emergencia médica, no uses este sitio web. 
                Llama inmediatamente al 911 o dirígete al centro de emergencias más cercano.
              </Text>
              <Button color="red" size="lg">
                Llamar 911
              </Button>
            </Box>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Horarios de Atención</Title>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text>Lunes - Viernes:</Text>
              <Text fw={500}>8:00 AM - 8:00 PM</Text>
            </Group>
            <Group justify="space-between">
              <Text>Sábados:</Text>
              <Text fw={500}>9:00 AM - 5:00 PM</Text>
            </Group>
            <Group justify="space-between">
              <Text>Domingos:</Text>
              <Text fw={500}>Solo emergencias</Text>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
