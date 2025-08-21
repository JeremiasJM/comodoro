import { Container, Title, Text, Box, Stack, Card, Group, ThemeIcon } from '@mantine/core';
import { IconInfoCircle, IconUsers, IconHeartHandshake } from '@tabler/icons-react';
import TypographyExample from '@/components/TypographyExample';

export default function Proyecto() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box ta="center">
          <Title order={1} size="h1" mb="md">
            Sobre el Proyecto
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Conoce más sobre nuestra misión de brindar asistencia de salud accesible y confiable
          </Text>
        </Box>

        <Group grow align="stretch">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="md">
              <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                <IconInfoCircle size={24} />
              </ThemeIcon>
              <Title order={3}>Nuestra Misión</Title>
            </Group>
            <Text size="sm" c="dimmed">
              Proporcionar información de salud confiable y accesible para ayudar a las personas 
              a tomar decisiones informadas sobre su bienestar.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="md">
              <ThemeIcon size="lg" radius="md" variant="light" color="green">
                <IconUsers size={24} />
              </ThemeIcon>
              <Title order={3}>Nuestro Equipo</Title>
            </Group>
            <Text size="sm" c="dimmed">
              Un equipo multidisciplinario de profesionales de la salud, desarrolladores 
              y expertos en tecnología trabajando juntos.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="md">
              <ThemeIcon size="lg" radius="md" variant="light" color="pink">
                <IconHeartHandshake size={24} />
              </ThemeIcon>
              <Title order={3}>Nuestros Valores</Title>
            </Group>
            <Text size="sm" c="dimmed">
              Compromiso con la precisión, accesibilidad, privacidad y el bienestar 
              de nuestros usuarios.
            </Text>
          </Card>
        </Group>

        {/* Typography Example - Temporal para ver las fuentes */}
        <Box>
          <Title order={2} mb="md" ta="center">Ejemplo de Tipografías</Title>
          <TypographyExample />
        </Box>
      </Stack>
    </Container>
  );
}
