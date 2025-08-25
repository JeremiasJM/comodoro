import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Select,
  Card,
  Badge,
  ActionIcon,
  Drawer,
  ScrollArea,
  TextInput,
  Chip,
  Flex,
  Modal,
  List,
  Divider,
  Anchor
} from '@mantine/core';
import {
  IconMapPin,
  IconFilter,
  IconSearch,
  IconPhone,
  IconClock,
  IconMail,
  IconExternalLink,
  IconCurrentLocation,
  IconX,
  IconMap
} from '@tabler/icons-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import classes from './InteractiveMap.module.css';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos personalizados para diferentes tipos de servicios
const createCustomIcon = (color = '#4A90E2') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Componente para centrar el mapa en una ubicación
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

// Componente para restringir el mapa a Comodoro Rivadavia
const ComodoroBoundsController = () => {
  const map = useMap();
  
  useEffect(() => {
    // Configurar límites estrictos
    map.setMaxBounds(COMODORO_BOUNDS);
    map.options.maxBoundsViscosity = 1.0;
    
    // Evento que se ejecuta cuando el usuario intenta moverse fuera de los límites
    const onMoveEnd = () => {
      const center = map.getCenter();
      if (!isWithinComodoro(center.lat, center.lng)) {
        // Forzar regreso al centro de Comodoro
        map.setView(COMODORO_CENTER, 13);
      }
    };
    
    map.on('moveend', onMoveEnd);
    
    // Cleanup
    return () => {
      map.off('moveend', onMoveEnd);
    };
  }, [map]);
  
  return null;
};

// Datos de ejemplo de centros de salud en Comodoro Rivadavia
const healthCenters = [
  {
    id: 1,
    name: "Hospital Regional Comodoro Rivadavia",
    address: "Av. Hipólito Yrigoyen 950, Comodoro Rivadavia",
    lat: -45.8648,
    lng: -67.4956,
    phone: "+54 297 446-9300",
    email: "hospital@comodoro.gov.ar",
    website: "www.hospitalregional.gov.ar",
    hours: {
      weekdays: "24 horas",
      weekends: "24 horas"
    },
    services: ["test", "prep", "pep", "orientacion", "preservativos"],
    type: "publico",
    description: "Hospital regional con atención 24 horas"
  },
  {
    id: 2,
    name: "Centro de Salud Barrio Güemes",
    address: "Barrio Güemes, Comodoro Rivadavia",
    lat: -45.8583,
    lng: -67.4889,
    phone: "+54 297 444-5678",
    email: "centroguemes@comodoro.gov.ar",
    hours: {
      weekdays: "8:00 - 20:00",
      weekends: "9:00 - 17:00"
    },
    services: ["test", "orientacion", "preservativos"],
    type: "publico",
    description: "Centro de salud público barrial"
  },
  {
    id: 3,
    name: "Centro de Salud Km 3",
    address: "Km 3, Comodoro Rivadavia",
    lat: -45.8756,
    lng: -67.5123,
    phone: "+54 297 447-8901",
    email: "centrokm3@comodoro.gov.ar",
    hours: {
      weekdays: "8:00 - 18:00",
      weekends: "9:00 - 14:00"
    },
    services: ["test", "orientacion", "preservativos"],
    type: "publico",
    description: "Centro de salud en zona sur de la ciudad"
  },
  {
    id: 4,
    name: "Centro de Salud General Mosconi",
    address: "General Mosconi, Comodoro Rivadavia",
    lat: -45.8456,
    lng: -67.5234,
    phone: "+54 297 448-1234",
    email: "centromosconi@comodoro.gov.ar",
    hours: {
      weekdays: "7:00 - 19:00",
      weekends: "8:00 - 16:00"
    },
    services: ["test", "prep", "orientacion", "preservativos"],
    type: "publico",
    description: "Centro de salud en zona norte"
  },
  {
    id: 5,
    name: "Clínica Comodoro",
    address: "San Martín 341, Comodoro Rivadavia",
    lat: -45.8612,
    lng: -67.4834,
    phone: "+54 297 447-5555",
    email: "info@clinicacomodoro.com.ar",
    website: "www.clinicacomodoro.com.ar",
    hours: {
      weekdays: "7:00 - 22:00",
      weekends: "8:00 - 20:00"
    },
    services: ["test", "prep", "pep", "orientacion"],
    type: "privado",
    description: "Clínica privada en el centro de la ciudad"
  },
  {
    id: 6,
    name: "Centro Comunitario Restinga Alí",
    address: "Restinga Alí, Comodoro Rivadavia",
    lat: -45.8789,
    lng: -67.5456,
    phone: "+54 297 449-0123",
    email: "restingaali@comunidad.org",
    hours: {
      weekdays: "9:00 - 18:00",
      weekends: "10:00 - 14:00"
    },
    services: ["orientacion", "preservativos"],
    type: "ong",
    description: "Centro comunitario con enfoque en prevención"
  }
];

const serviceTypes = [
  { value: 'test', label: 'Test de VIH/ITS', color: 'red' },
  { value: 'prep', label: 'PrEP', color: 'blue' },
  { value: 'pep', label: 'PEP', color: 'green' },
  { value: 'preservativos', label: 'Preservativos', color: 'pink' },
  { value: 'orientacion', label: 'Orientación', color: 'violet' }
];

const centerTypes = [
  { value: 'publico', label: 'Público' },
  { value: 'privado', label: 'Privado' },
  { value: 'ong', label: 'ONG/Comunitario' }
];

// Función para obtener color según el tipo de centro
const getTypeColor = (type) => {
  const colors = {
    'Público': '#1976d2',
    'Privado': '#f57c00',
    'ONG': '#388e3c'
  };
  return colors[type] || '#4A90E2';
};

// Función para abrir direcciones en Google Maps (solo para ubicaciones en Comodoro)
const openDirections = (center) => {
  // Verificar que el centro esté dentro de Comodoro antes de abrir direcciones
  if (!isWithinComodoro(center.lat, center.lng)) {
    alert('Esta ubicación está fuera de Comodoro Rivadavia.');
    return;
  }
  
  const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}&destination_place_id=ChIJg3wQdMYXdL0Rsqyg4w2O&travelmode=driving`;
  window.open(url, '_blank');
};

// Coordenadas de Comodoro Rivadavia - Límites más estrictos
const COMODORO_CENTER = [-45.8648, -67.4956];
const COMODORO_BOUNDS = [
  [-45.9100, -67.5800], // Suroeste - límites más ajustados
  [-45.8200, -67.4200]  // Noreste - límites más ajustados
];

// Función para verificar si una coordenada está dentro de Comodoro Rivadavia
const isWithinComodoro = (lat, lng) => {
  return lat >= COMODORO_BOUNDS[0][0] && 
         lat <= COMODORO_BOUNDS[1][0] && 
         lng >= COMODORO_BOUNDS[0][1] && 
         lng <= COMODORO_BOUNDS[1][1];
};

const InteractiveMap = () => {
  const [filteredCenters, setFilteredCenters] = useState(healthCenters);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Filtrar centros de salud (solo los que están en Comodoro Rivadavia)
  useEffect(() => {
    // Primero filtrar solo los centros que están dentro de Comodoro
    let filtered = healthCenters.filter(center => 
      isWithinComodoro(center.lat, center.lng)
    );

    if (selectedServices.length > 0) {
      filtered = filtered.filter(center =>
        selectedServices.some(service =>
          center.services.includes(service)
        )
      );
    }

    if (selectedType) {
      filtered = filtered.filter(center => center.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(center =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCenters(filtered);
  }, [selectedServices, selectedType, searchQuery]);

  // Obtener ubicación del usuario (solo si está en Comodoro Rivadavia)
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Verificar si la ubicación está dentro de los límites estrictos de Comodoro Rivadavia
          if (isWithinComodoro(lat, lng)) {
            setUserLocation({ lat, lng });
          } else {
            console.log('Ubicación fuera de Comodoro Rivadavia');
            // Mostrar mensaje y centrar en Comodoro
            alert('Tu ubicación está fuera de Comodoro Rivadavia. El mapa se centrará en la ciudad para mostrarte los servicios disponibles.');
            // No establecer userLocation para forzar el uso del centro de Comodoro
          }
        },
        (error) => {
          console.log('Error obteniendo ubicación:', error);
          // En caso de error, centrar en Comodoro
          alert('No se pudo obtener tu ubicación. El mapa se centrará en Comodoro Rivadavia.');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización. El mapa se centrará en Comodoro Rivadavia.');
    }
  };

  const handleServiceFilter = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSelectedServices([]);
    setSelectedType('');
    setSearchQuery('');
  };

  const openCenterDetails = (center) => {
    setSelectedCenter(center);
    setDetailsOpen(true);
  };

  const getDirections = (center) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Container size="xl" py="xl" className={classes.container}>
      <Stack gap="lg">
        {/* Header */}
        <Box ta="center">
          <Title order={1} size="2.5rem" mb="md">
            Mapa de Centros de Salud
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Encuentra centros de salud cerca de ti con los servicios que necesitas
          </Text>
        </Box>

        {/* Search and Filters */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" wrap="nowrap">
              <TextInput
                placeholder="Buscar por nombre o dirección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftSection={<IconSearch size={16} />}
                style={{ flex: 1 }}
                radius="lg"
              />
              <Group gap="xs">
                <Button
                  variant="outline"
                  leftSection={<IconFilter size={16} />}
                  onClick={() => setFiltersOpen(true)}
                  radius="lg"
                >
                  Filtros
                </Button>
                <ActionIcon
                  variant="outline"
                  size="lg"
                  onClick={getUserLocation}
                  radius="lg"
                  title="Mi ubicación"
                >
                  <IconCurrentLocation size={18} />
                </ActionIcon>
              </Group>
            </Group>

            {/* Active Filters */}
            {(selectedServices.length > 0 || selectedType) && (
              <Group gap="xs">
                <Text size="sm" fw={500}>Filtros activos:</Text>
                {selectedServices.map(service => {
                  const serviceInfo = serviceTypes.find(s => s.value === service);
                  return (
                    <Badge
                      key={service}
                      color={serviceInfo?.color}
                      variant="light"
                      rightSection={
                        <ActionIcon
                          size="xs"
                          color={serviceInfo?.color}
                          radius="xl"
                          variant="transparent"
                          onClick={() => handleServiceFilter(service)}
                        >
                          <IconX size={10} />
                        </ActionIcon>
                      }
                    >
                      {serviceInfo?.label}
                    </Badge>
                  );
                })}
                {selectedType && (
                  <Badge
                    color="gray"
                    variant="light"
                    rightSection={
                      <ActionIcon
                        size="xs"
                        color="gray"
                        radius="xl"
                        variant="transparent"
                        onClick={() => setSelectedType('')}
                      >
                        <IconX size={10} />
                      </ActionIcon>
                    }
                  >
                    {centerTypes.find(t => t.value === selectedType)?.label}
                  </Badge>
                )}
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={clearFilters}
                  color="gray"
                >
                  Limpiar todo
                </Button>
              </Group>
            )}
          </Stack>
        </Card>

        {/* Map Container */}
        <Card shadow="sm" padding={0} radius="md" withBorder className={classes.mapContainer}>
          <Box className={classes.mapWrapper}>
            <MapContainer
              center={userLocation || COMODORO_CENTER}
              zoom={userLocation ? 15 : 13}
              style={{ 
                height: '500px', 
                width: '100%', 
                borderRadius: '12px',
                zIndex: 1,
                position: 'relative'
              }}
              scrollWheelZoom={true}
              maxBounds={COMODORO_BOUNDS}
              maxBoundsViscosity={1.0}
              minZoom={12}
              maxZoom={18}
              doubleClickZoom={true}
              dragging={true}
              keyboard={false}
              attributionControl={true}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapController 
                center={userLocation || COMODORO_CENTER} 
                zoom={userLocation ? 15 : 13} 
              />
              
              <ComodoroBoundsController />

              {/* Marcador de ubicación del usuario */}
              {userLocation && (
                <Marker 
                  position={userLocation}
                  icon={createCustomIcon('#E53E3E')}
                >
                  <Popup>
                    <Box p="xs">
                      <Text fw={500} size="sm">Tu ubicación</Text>
                      <Text size="xs" c="dimmed">Ubicación actual detectada</Text>
                    </Box>
                  </Popup>
                </Marker>
              )}

              {/* Marcadores de centros de salud */}
              {filteredCenters.map((center) => (
                <Marker
                  key={center.id}
                  position={[center.lat, center.lng]}
                  icon={createCustomIcon(getTypeColor(center.type))}
                >
                  <Popup>
                    <Box p="sm" style={{ minWidth: '200px' }}>
                      <Text fw={600} size="sm" mb="xs">{center.name}</Text>
                      <Text size="xs" c="dimmed" mb="xs">{center.address}</Text>
                      
                      <Group gap="xs" mb="xs">
                        {center.services.map((service) => (
                          <Badge key={service} size="xs" variant="light">
                            {service}
                          </Badge>
                        ))}
                      </Group>

                      <Stack gap={4}>
                        <Group gap="xs">
                          <IconPhone size={12} />
                          <Text size="xs">{center.phone}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={12} />
                          <Text size="xs">{center.hours.weekdays}</Text>
                        </Group>
                      </Stack>

                      <Group mt="xs" gap="xs">
                        <Button
                          size="xs"
                          variant="light"
                          leftSection={<IconMapPin size={12} />}
                          onClick={() => setSelectedCenter(center)}
                        >
                          Ver detalles
                        </Button>
                        <ActionIcon
                          size="sm"
                          variant="light"
                          onClick={() => openDirections(center)}
                        >
                          <IconExternalLink size={12} />
                        </ActionIcon>
                      </Group>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Card>

        {/* Results List */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={3}>
                Centros encontrados ({filteredCenters.length})
              </Title>
            </Group>

            <ScrollArea h={400}>
              <Stack gap="sm">
                {filteredCenters.map((center) => (
                  <Card
                    key={center.id}
                    shadow="xs"
                    padding="md"
                    radius="md"
                    withBorder
                    className={classes.centerCard}
                    onClick={() => openCenterDetails(center)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb="xs">
                          <Text fw={600} size="md">{center.name}</Text>
                          <Badge
                            size="xs"
                            color={center.type === 'publico' ? 'blue' : center.type === 'privado' ? 'orange' : 'green'}
                            variant="light"
                          >
                            {centerTypes.find(t => t.value === center.type)?.label}
                          </Badge>
                        </Group>
                        
                        <Text size="sm" c="dimmed" mb="xs">
                          <IconMapPin size={14} style={{ verticalAlign: 'text-bottom' }} />
                          {' '}{center.address}
                        </Text>
                        
                        <Flex gap="xs" wrap="wrap" mb="xs">
                          {center.services.map(service => {
                            const serviceInfo = serviceTypes.find(s => s.value === service);
                            return (
                              <Badge
                                key={service}
                                size="xs"
                                color={serviceInfo?.color}
                                variant="dot"
                              >
                                {serviceInfo?.label}
                              </Badge>
                            );
                          })}
                        </Flex>
                        
                        <Text size="xs" c="dimmed">
                          <IconClock size={12} style={{ verticalAlign: 'text-bottom' }} />
                          {' '}Lun-Vie: {center.hours.weekdays}
                        </Text>
                      </Box>
                      
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(center);
                        }}
                      >
                        <IconExternalLink size={16} />
                      </ActionIcon>
                    </Group>
                  </Card>
                ))}
                
                {filteredCenters.length === 0 && (
                  <Box ta="center" py="xl">
                    <Text c="dimmed">
                      No se encontraron centros de salud con los filtros seleccionados.
                    </Text>
                    <Button variant="light" mt="sm" onClick={clearFilters}>
                      Limpiar filtros
                    </Button>
                  </Box>
                )}
              </Stack>
            </ScrollArea>
          </Stack>
        </Card>
      </Stack>

      {/* Filters Drawer */}
      <Drawer
        opened={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filtros de búsqueda"
        position="right"
        size="sm"
      >
        <Stack gap="lg">
          <Box>
            <Text size="sm" fw={500} mb="xs">Tipo de servicios</Text>
            <Stack gap="xs">
              {serviceTypes.map(service => (
                <Chip
                  key={service.value}
                  checked={selectedServices.includes(service.value)}
                  onChange={() => handleServiceFilter(service.value)}
                  color={service.color}
                  variant="light"
                >
                  {service.label}
                </Chip>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text size="sm" fw={500} mb="xs">Tipo de centro</Text>
            <Select
              placeholder="Seleccionar tipo"
              value={selectedType}
              onChange={setSelectedType}
              data={centerTypes}
              clearable
            />
          </Box>

          <Button onClick={() => setFiltersOpen(false)} fullWidth>
            Aplicar filtros
          </Button>
        </Stack>
      </Drawer>

      {/* Center Details Modal */}
      <Modal
        opened={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={selectedCenter?.name}
        size="md"
        centered
      >
        {selectedCenter && (
          <Stack gap="md">
            <Text size="sm" c="dimmed">{selectedCenter.description}</Text>
            
            <Divider />
            
            <Box>
              <Text size="sm" fw={500} mb="xs">Información de contacto</Text>
              <List spacing="xs" size="sm">
                <List.Item icon={<IconMapPin size={16} />}>
                  {selectedCenter.address}
                </List.Item>
                <List.Item icon={<IconPhone size={16} />}>
                  <Anchor href={`tel:${selectedCenter.phone}`}>
                    {selectedCenter.phone}
                  </Anchor>
                </List.Item>
                <List.Item icon={<IconMail size={16} />}>
                  <Anchor href={`mailto:${selectedCenter.email}`}>
                    {selectedCenter.email}
                  </Anchor>
                </List.Item>
                {selectedCenter.website && (
                  <List.Item icon={<IconExternalLink size={16} />}>
                    <Anchor href={`https://${selectedCenter.website}`} target="_blank">
                      {selectedCenter.website}
                    </Anchor>
                  </List.Item>
                )}
              </List>
            </Box>
            
            <Box>
              <Text size="sm" fw={500} mb="xs">Horarios de atención</Text>
              <Text size="sm">
                <strong>Lunes a Viernes:</strong> {selectedCenter.hours.weekdays}
              </Text>
              <Text size="sm">
                <strong>Fines de semana:</strong> {selectedCenter.hours.weekends}
              </Text>
            </Box>
            
            <Box>
              <Text size="sm" fw={500} mb="xs">Servicios disponibles</Text>
              <Flex gap="xs" wrap="wrap">
                {selectedCenter.services.map(service => {
                  const serviceInfo = serviceTypes.find(s => s.value === service);
                  return (
                    <Badge
                      key={service}
                      color={serviceInfo?.color}
                      variant="light"
                    >
                      {serviceInfo?.label}
                    </Badge>
                  );
                })}
              </Flex>
            </Box>
            
            <Group justify="space-between" mt="md">
              <Button
                variant="outline"
                onClick={() => getDirections(selectedCenter)}
                leftSection={<IconExternalLink size={16} />}
              >
                Cómo llegar
              </Button>
              <Button onClick={() => setDetailsOpen(false)}>
                Cerrar
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default InteractiveMap;
