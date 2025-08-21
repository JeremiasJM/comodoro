import { Container, Title, Text, Box, Stack, Card, Button, Group, List, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconMessageCircle, IconClock, IconShield, IconHeart, IconBrain, IconUserCheck } from '@tabler/icons-react';

const features = [
  {
    icon: IconBrain,
    title: "Especializado en Salud",
    description: "Información específica sobre salud y bienestar basada en fuentes confiables"
  },
  {
    icon: IconClock,
    title: "Disponible 24/7",
    description: "Acceso inmediato a información de salud cuando lo necesites"
  },
  {
    icon: IconShield,
    title: "Privacidad Garantizada",
    description: "Tus consultas son completamente anónimas y seguras"
  },
  {
    icon: IconUserCheck,
    title: "Fácil de Usar",
    description: "Interfaz simple e intuitiva para todos los usuarios"
  }
];

export default function Chat() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box ta="center">
          <Title order={1} size="2.5rem" mb="md">
            Chatbot Salud Comodoro
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Obtén información confiable sobre salud y bienestar a través de nuestro chatbot especializado. 
            Disponible las 24 horas para ayudarte con tus consultas de salud.
          </Text>
        </Box>

        {/* Features Grid */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {features.map((feature, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Group mb="md">
                <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                  <feature.icon size={28} />
                </ThemeIcon>
                <Title order={4}>{feature.title}</Title>
              </Group>
              <Text size="sm" c="dimmed">
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* How it works */}
        <Card shadow="sm" padding="xl" radius="md" withBorder bg="blue.0">
          <Stack gap="md">
            <Title order={3} ta="center" c="blue">¿Cómo usar el Chatbot Salud Comodoro?</Title>
            <List
              spacing="sm"
              size="sm"
              center
              icon={
                <ThemeIcon color="blue" size={20} radius="xl">
                  <IconMessageCircle size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <Text fw={500}>Haz clic en el botón de chat flotante</Text> en la esquina inferior derecha
              </List.Item>
              <List.Item>
                <Text fw={500}>Escribe tu consulta sobre salud</Text> de forma natural y clara
              </List.Item>
              <List.Item>
                <Text fw={500}>Recibe orientación inmediata</Text> basada en información de salud confiable
              </List.Item>
              <List.Item>
                <Text fw={500}>Continúa la conversación</Text> para obtener más detalles o hacer nuevas consultas
              </List.Item>
            </List>
          </Stack>
        </Card>

        {/* Topics covered */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md" ta="center">Temas que puedes consultar</Title>
          <SimpleGrid cols={{ base: 2, md: 3 }} spacing="sm">
            {[
              "Síntomas generales",
              "Prevención de enfermedades",
              "Primeros auxilios",
              "Medicamentos",
              "Salud mental",
              "Nutrición",
              "Ejercicio y bienestar",
              "Salud reproductiva",
              "Vacunación",
              "Cuidados durante el embarazo",
              "Salud infantil",
              "Enfermedades crónicas"
            ].map((topic, index) => (
              <Card key={index} bg="gray.0" p="xs" radius="sm">
                <Text size="sm" ta="center" fw={500}>
                  {topic}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Card>

        {/* Important notice */}
        <Box ta="center" p="md" bg="yellow.0" radius="md">
          <Text size="sm" fw={500} mb="xs">⚠️ Recordatorio Importante</Text>
          <Text size="sm" c="dimmed">
            El Chatbot Salud Comodoro proporciona información educativa y no constituye consejo médico profesional. 
            En caso de emergencia o síntomas graves, busca atención médica inmediata.
          </Text>
        </Box>

        {/* CTA */}
        <Box ta="center">
          <Text size="lg" mb="md" fw={500}>
            ¿Listo para comenzar?
          </Text>
          <Text size="md" c="dimmed" mb="lg">
            Busca el botón de chat flotante en la esquina inferior derecha de tu pantalla
          </Text>
          <Group justify="center">
            <ThemeIcon size="xl" radius="50%" color="blue" variant="light">
              <IconMessageCircle size={32} />
            </ThemeIcon>
            <Text size="sm" c="blue" fw={500}>
              Botón de chat siempre visible
            </Text>
          </Group>
        </Box>
      </Stack>
    </Container>
  );
}
