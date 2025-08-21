import { Container, Grid, Loader, Title, Text, Box, Stack, Button, Group, Card, SimpleGrid, ThemeIcon } from "@mantine/core";
import { IconHeartHandshake, IconMessageCircle, IconQuestionMark, IconPhone } from "@tabler/icons-react";
import Link from "next/link";

const features = [
  {
    icon: IconHeartHandshake,
    title: "Hepatitis",
    description: "Información sobre prevención y tratamiento",
    color: "red"
  },
  {
    icon: IconHeartHandshake,
    title: "PrEP",
    description: "Profilaxis pre-exposición al VIH",
    color: "blue"
  },
  {
    icon: IconHeartHandshake,
    title: "Anticonceptivos",
    description: "Métodos anticonceptivos disponibles",
    color: "pink"
  },
  {
    icon: IconHeartHandshake,
    title: "Embarazo",
    description: "Cuidados durante el embarazo",
    color: "green"
  },
  {
    icon: IconHeartHandshake,
    title: "VIH",
    description: "Prevención y tratamiento del VIH",
    color: "violet"
  }
];

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <Box ta="center" py="xl">
          <Title order={1} size="3rem" mb="md" c="blue">
            ¿Estás listo para sacarte todas tus dudas?
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto" mb="xl">
            Chatea con nuestro Chatbot Salud Comodoro de forma anónima y encontrá información confiable sobre temas de salud.
          </Text>
          <Group justify="center" gap="md">
            <Button 
              component={Link} 
              href="/chat" 
              size="lg" 
              variant="outline"
              leftSection={<IconMessageCircle size={20} />}
              radius="xl"
            >
              Conocer más sobre el chat
            </Button>
            <Text size="sm" c="dimmed">
              o usa el botón flotante 💬 en la esquina inferior derecha
            </Text>
          </Group>
        </Box>

        {/* Topics Section */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Explorá artículos por temática
          </Title>
          <SimpleGrid cols={{ base: 2, md: 5 }} spacing="lg">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                shadow="sm" 
                padding="lg" 
                radius="md" 
                withBorder
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                className="hover-card"
              >
                <Stack align="center" ta="center" gap="sm">
                  <ThemeIcon size="xl" radius="50%" variant="light" color={feature.color}>
                    <feature.icon size={32} />
                  </ThemeIcon>
                  <Title order={4} size="1.1rem">{feature.title}</Title>
                  <Text size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Health Centers Section */}
        <Box>
          <Title order={2} ta="center" mb="md">
            Encontrá un centro de salud cercano
          </Title>
          <Box 
            h={300} 
            bg="gray.1" 
            radius="md" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23e9ecef" fill-opacity="0.4"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Stack align="center" ta="center">
              <Text size="lg" fw={500} c="gray.6">
                Mapa de centros de salud
              </Text>
              <Text size="sm" c="gray.5">
                Próximamente disponible
              </Text>
            </Stack>
          </Box>
        </Box>
      </Stack>

      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Container>
  );
}
