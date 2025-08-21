import { Container, Title, Text, Box, Breadcrumbs, Anchor } from '@mantine/core';
import { IconHome, IconMap } from '@tabler/icons-react';
import InteractiveMap from '../components/InteractiveMap';
import Link from 'next/link';

export default function MapaPage() {
  const breadcrumbItems = [
    { title: 'Inicio', href: '/' },
    { title: 'Mapa de Servicios', href: '/mapa' }
  ].map((item, index) => (
    <Link href={item.href} key={index} passHref legacyBehavior>
      <Anchor size="sm">{item.title}</Anchor>
    </Link>
  ));

  return (
    <Container size="xl" py="lg" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* Breadcrumbs */}
      <Box mb="xl">
        <Breadcrumbs mb="sm">
          {breadcrumbItems}
        </Breadcrumbs>
        
        <Title order={1} size="h1" c="blue" fw={700} style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <IconMap size={36} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Mapa de Servicios de Salud
        </Title>
        
        <Text c="dimmed" size="lg" mt="sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Encuentra servicios de salud sexual y reproductiva cerca de tu ubicación
        </Text>
      </Box>

      {/* Interactive Map Component */}
      <InteractiveMap />
    </Container>
  );
}
