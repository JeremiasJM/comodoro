import { Container, Title, Text, Box, Stack, Accordion, Card } from '@mantine/core';
import { IconQuestionMark, IconHeart, IconPill, IconStethoscope } from '@tabler/icons-react';

const faqs = [
  {
    value: "emergency",
    title: "¿Cuándo debo buscar atención médica de emergencia?",
    content: "Busca atención médica inmediata si experimentas: dolor en el pecho, dificultad para respirar, pérdida de conciencia, sangrado severo, dolor abdominal intenso, o cualquier síntoma que te haga sentir que tu vida está en peligro."
  },
  {
    value: "symptoms",
    title: "¿Cómo puedo describir mejor mis síntomas?",
    content: "Incluye: cuándo comenzaron los síntomas, qué los mejora o empeora, intensidad del dolor (escala 1-10), ubicación exacta, y si hay síntomas asociados. Mantén un registro de síntomas si es posible."
  },
  {
    value: "prevention",
    title: "¿Qué puedo hacer para prevenir enfermedades?",
    content: "Mantén una dieta balanceada, ejercítate regularmente, duerme 7-8 horas, mantén buena higiene, vacúnate según corresponda, y realiza chequeos médicos preventivos regulares."
  },
  {
    value: "medications",
    title: "¿Cómo debo tomar mis medicamentos?",
    content: "Sigue siempre las instrucciones de tu médico, toma los medicamentos a las horas indicadas, completa el tratamiento aunque te sientas mejor, y nunca compartas medicamentos con otras personas."
  }
];

export default function Consultas() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Box ta="center">
          <Title order={1} size="h1" mb="md">
            Preguntas Frecuentes
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Encuentra respuestas a las consultas más comunes sobre salud y bienestar
          </Text>
        </Box>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Accordion variant="separated" radius="md">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.value} value={faq.value}>
                <Accordion.Control>
                  <Text fw={500}>{faq.title}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="dimmed">
                    {faq.content}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>

        <Box ta="center" p="md" bg="yellow.0" radius="md">
          <Text size="sm" fw={500} mb="xs">⚠️ Recordatorio Importante</Text>
          <Text size="sm" c="dimmed">
            Esta información es educativa y no constituye consejo médico profesional. 
            Siempre consulta con un profesional de la salud para obtener un diagnóstico 
            y tratamiento adecuados.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
