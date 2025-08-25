import React, { useState, useEffect } from 'react';
import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Card,
  Badge
} from '@mantine/core';
import {
  IconMapPin,
  IconCurrentLocation,
  IconExternalLink
} from '@tabler/icons-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas de Comodoro Rivadavia
const COMODORO_CENTER = [-45.8648, -67.4956];
const COMODORO_BOUNDS = [
  [-45.9100, -67.5800],
  [-45.8200, -67.4200]
];

// Función para verificar si una coordenada está dentro de Comodoro Rivadavia
const isWithinComodoro = (lat, lng) => {
  return lat >= COMODORO_BOUNDS[0][0] && 
         lat <= COMODORO_BOUNDS[1][0] && 
         lng >= COMODORO_BOUNDS[0][1] && 
         lng <= COMODORO_BOUNDS[1][1];
};

// Iconos personalizados para diferentes tipos de servicios
const createCustomIcon = (color = '#4A90E2') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 6px;
        height: 6px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Datos destacados de centros de salud (solo algunos para la vista compacta)
const featuredCenters = [
  {
    id: 1,
    name: "Hospital Regional Comodoro Rivadavia",
    address: "Av. Hipólito Yrigoyen 950",
    lat: -45.8648,
    lng: -67.4956,
    type: "publico",
    services: ["test", "prep", "pep", "orientacion", "preservativos"],
    hours: "24 horas"
  },
  {
    id: 2,
    name: "Centro de Salud Barrio Güemes",
    address: "Barrio Güemes",
    lat: -45.8583,
    lng: -67.4889,
    type: "publico",
    services: ["test", "orientacion", "preservativos"],
    hours: "8:00 - 20:00"
  },
  {
    id: 5,
    name: "Clínica Comodoro",
    address: "San Martín 341",
    lat: -45.8612,
    lng: -67.4834,
    type: "privado",
    services: ["test", "prep", "pep", "orientacion"],
    hours: "7:00 - 22:00"
  }
];

// Función para obtener color según el tipo de centro
const getTypeColor = (type) => {
  const colors = {
    'publico': '#1976d2',
    'privado': '#f57c00',
    'ong': '#388e3c'
  };
  return colors[type] || '#4A90E2';
};

const CompactMap = () => {
  const [userLocation, setUserLocation] = useState(null);

  // Obtener ubicación del usuario
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          if (isWithinComodoro(lat, lng)) {
            setUserLocation({ lat, lng });
          }
        },
        (error) => {
          console.log('Error obteniendo ubicación:', error);
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={3} size="h4" mb="xs">
              Mapa de Centros de Salud
            </Title>
            <Text size="sm" c="dimmed">
              {featuredCenters.length} centros destacados en Comodoro Rivadavia
            </Text>
          </Box>
          <Group gap="xs">
            <Button
              variant="light"
              size="xs"
              leftSection={<IconCurrentLocation size={14} />}
              onClick={getUserLocation}
            >
              Mi ubicación
            </Button>
            <Button
              component={Link}
              href="/mapa"
              variant="outline"
              size="xs"
              leftSection={<IconExternalLink size={14} />}
            >
              Ver completo
            </Button>
          </Group>
        </Group>

        {/* Map */}
        <Box style={{ 
          height: '300px', 
          borderRadius: '8px', 
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1
        }}>
          <MapContainer
            center={userLocation || COMODORO_CENTER}
            zoom={13}
            style={{ 
              height: '100%', 
              width: '100%',
              zIndex: 1,
              position: 'relative'
            }}
            scrollWheelZoom={false}
            dragging={true}
            zoomControl={true}
            maxBounds={COMODORO_BOUNDS}
            maxBoundsViscosity={1.0}
            minZoom={12}
            maxZoom={16}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marcador de ubicación del usuario */}
            {userLocation && (
              <Marker 
                position={userLocation}
                icon={createCustomIcon('#E53E3E')}
              >
                <Popup>
                  <Box p="xs">
                    <Text fw={500} size="sm">Tu ubicación</Text>
                    <Text size="xs" c="dimmed">Ubicación actual</Text>
                  </Box>
                </Popup>
              </Marker>
            )}

            {/* Marcadores de centros destacados */}
            {featuredCenters.map((center) => (
              <Marker
                key={center.id}
                position={[center.lat, center.lng]}
                icon={createCustomIcon(getTypeColor(center.type))}
              >
                <Popup>
                  <Box p="sm" style={{ minWidth: '180px' }}>
                    <Text fw={600} size="sm" mb="xs">{center.name}</Text>
                    <Text size="xs" c="dimmed" mb="xs">{center.address}</Text>
                    
                    <Group gap="xs" mb="xs">
                      <Badge 
                        size="xs" 
                        color={center.type === 'publico' ? 'blue' : 'orange'}
                        variant="light"
                      >
                        {center.type === 'publico' ? 'Público' : 'Privado'}
                      </Badge>
                    </Group>

                    <Text size="xs" c="dimmed" mb="xs">
                      Horarios: {center.hours}
                    </Text>

                    <Button
                      size="xs"
                      variant="light"
                      fullWidth
                      component={Link}
                      href="/mapa"
                      leftSection={<IconMapPin size={12} />}
                    >
                      Ver detalles
                    </Button>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>

        {/* Quick Stats */}
        <Group justify="space-around" bg="gray.0" p="sm" style={{ borderRadius: '8px' }}>
          <Stack align="center" gap={2}>
            <Text size="lg" fw={600} c="blue">
              {featuredCenters.filter(c => c.type === 'publico').length}
            </Text>
            <Text size="xs" c="dimmed">Públicos</Text>
          </Stack>
          <Stack align="center" gap={2}>
            <Text size="lg" fw={600} c="orange">
              {featuredCenters.filter(c => c.type === 'privado').length}
            </Text>
            <Text size="xs" c="dimmed">Privados</Text>
          </Stack>
          <Stack align="center" gap={2}>
            <Text size="lg" fw={600} c="green">
              24h
            </Text>
            <Text size="xs" c="dimmed">Atención</Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default CompactMap;
