import React from 'react';
import { 
  Group, 
  Box, 
  Text, 
  ActionIcon, 
  Container, 
  Stack, 
  Anchor,
  SimpleGrid,
  Flex,
  Space
} from '@mantine/core';
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconHelp,
  IconHeart
} from '@tabler/icons-react';
import { useMatches } from '@mantine/core';
import styles from './Footer.module.css';

const Footer = () => {
  // Datos de contacto
  const contactData = [
    {
      icon: IconPhone,
      text: '+54 9 297 123-4567',
      href: 'tel:+542971234567'
    },
    {
      icon: IconMail,
      text: 'salud@comodoro.gov.ar',
      href: 'mailto:salud@comodoro.gov.ar'
    },
    {
      icon: IconMapPin,
      text: 'Comodoro Rivadavia, Chubut',
      href: 'https://maps.google.com/?q=Comodoro+Rivadavia+Chubut'
    }
  ];

  // Redes sociales
  const socialLinks = [
    { icon: IconBrandFacebook, href: '#', label: 'Facebook' },
    { icon: IconBrandTwitter, href: '#', label: 'Twitter' },
    { icon: IconBrandInstagram, href: '#', label: 'Instagram' },
    { icon: IconBrandLinkedin, href: '#', label: 'LinkedIn' },
    { icon: IconBrandWhatsapp, href: '#', label: 'WhatsApp' }
  ];

  return (
    <Box className={styles.footer}>
      <Container size="xl" py="xl">
        {/* Una fila con 3 columnas usando SimpleGrid */}
        <SimpleGrid 
          cols={{ base: 1, sm: 3 }} 
          spacing={{ base: 'xl', sm: 'md' }}
          verticalSpacing={{ base: 'xl', sm: 'md' }}
        >
          {/* Columna 1: Contacto */}
          <Stack gap="md" align={{ base: 'center', sm: 'flex-start' }}>
            <Text 
              size="lg" 
              fw={600} 
              c="blue.4"
              ta={{ base: 'center', sm: 'left' }}
            >
              📞 Contáctanos
            </Text>
            <Stack gap="xs">
              {contactData.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <Anchor
                    key={index}
                    href={contact.href}
                    c="gray.2"
                    size="sm"
                    underline="never"
                    className={styles.contactLink}
                  >
                    <Group gap="xs" justify={{ base: 'center', sm: 'flex-start' }}>
                      <IconComponent size={18} color="#3498db" />
                      <Text size="sm">{contact.text}</Text>
                    </Group>
                  </Anchor>
                );
              })}
            </Stack>
          </Stack>

          {/* Columna 2: Logo Central */}
          <Stack gap="md" align="center">
            <Group gap="sm">
              <Box className={styles.logoIcon}>
                <IconHelp size={28} color="white" />
              </Box>
              <Text size="xl" fw={700} c="white">
                Comodoro Salud
              </Text>
            </Group>
            <Text 
              size="sm" 
              c="gray.4" 
              ta="center"
              lh={1.5}
            >
              Tu plataforma de salud digital confiable.
              <br />
              Conectando comunidades con soluciones de bienestar.
            </Text>
          </Stack>

          {/* Columna 3: Redes Sociales */}
          <Stack gap="md" align="center">
            <Text 
              size="lg" 
              fw={600} 
              c="blue.4"
              ta="center"
            >
              🌐 Síguenos
            </Text>
            <Group gap="sm" justify="center">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <ActionIcon
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    size="lg"
                    radius="md"
                    c="gray.3"
                    className={styles.socialIcon}
                    aria-label={social.label}
                  >
                    <IconComponent size={22} />
                  </ActionIcon>
                );
              })}
            </Group>
          </Stack>
        </SimpleGrid>

        <Space h="xl" />

        {/* Footer inferior */}
        <Box pt="md" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Stack gap="xs" align="center">
            <Text size="xs" c="gray.5" ta="center">
              © {new Date().getFullYear()} Municipalidad de Comodoro Rivadavia. Todos los derechos reservados.
            </Text>
            <Group gap={4} justify="center">
              <Text size="xs" c="gray.6">Hecho con</Text>
              <IconHeart size={12} color="#e74c3c" className={styles.heart} />
              <Text size="xs" c="gray.6">en Patagonia Argentina</Text>
            </Group>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
