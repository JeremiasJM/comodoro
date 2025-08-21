import { Stack, Title, Text, Button, Card, Group } from '@mantine/core';

export default function TypographyExample() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder m="md">
      <Stack gap="md">
        {/* Montserrat - Headings */}
        <Title order={1}>Heading 1 - Montserrat Bold</Title>
        <Title order={2}>Heading 2 - Montserrat SemiBold</Title>
        <Title order={3}>Heading 3 - Montserrat SemiBold</Title>
        <Title order={4}>Heading 4 - Montserrat Medium</Title>
        
        {/* Open Sans - Body text */}
        <Text size="lg">
          Este es un párrafo grande usando Open Sans. Esta tipografía es perfecta 
          para el contenido del cuerpo ya que es muy legible y moderna.
        </Text>
        
        <Text size="md">
          Este es un párrafo normal usando Open Sans. Perfecto para la lectura 
          de contenido extenso y descripciones.
        </Text>
        
        <Text size="sm" c="dimmed">
          Este es texto pequeño y atenuado usando Open Sans. Ideal para 
          información secundaria y metadatos.
        </Text>
        
        {/* Buttons - Montserrat */}
        <Group>
          <Button size="lg">Botón Grande - Montserrat</Button>
          <Button size="md" variant="outline">Botón Mediano</Button>
          <Button size="sm" variant="light">Botón Pequeño</Button>
        </Group>
        
        {/* Mixed example */}
        <Card bg="gray.0" p="md">
          <Title order={4} mb="xs">Título de Tarjeta - Montserrat</Title>
          <Text size="sm">
            Descripción de la tarjeta usando Open Sans. Esta combinación de 
            Montserrat para títulos y Open Sans para el contenido crea una 
            jerarquía visual clara y moderna.
          </Text>
        </Card>
      </Stack>
    </Card>
  );
}
