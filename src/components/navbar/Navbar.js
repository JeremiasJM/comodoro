import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Group,
  Text,
  Button,
  Burger,
  Drawer,
  Stack,
  Box,
  ActionIcon,
  Container,
  Image,
  Anchor,
  Collapse,
  UnstyledButton
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconHelp,
  IconMenu2,
  IconChevronDown
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './Navbar.module.css';

const navigation = [
  { name: 'Sobre el Proyecto', href: '/proyecto' },
  { name: 'Mapa de Servicios', href: '/mapa' },
  { name: 'Chatear', href: '/chat' },
  { name: 'Preguntas y consultas', href: '/consultas' },
  { name: 'Contactos', href: '/contactos' }
];

const Navbar = () => {
  const [opened, setOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Cerrar el drawer cuando cambie la ruta
  useEffect(() => {
    setOpened(false);
  }, [router.pathname]);

  return (
    <>
      <AppShell.Header className={classes.header}>
        <Container size="xl" className={classes.inner}>
          {/* Logo */}
          <Group className={classes.logo}>
            <Box className={classes.logoIcon}>
              <IconHelp size={isMobile ? 24 : 32} color="white" />
            </Box>
          </Group>

          {/* Desktop Navigation - Solo visible en desktop */}
          {!isMobile && !isTablet && (
            <Group className={classes.desktopNav} gap="xl">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`${classes.link} ${router.pathname === item.href ? classes.linkActive : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </Group>
          )}

          {/* Tablet Navigation - Horizontal scrollable */}
          {isTablet && (
            <Box className={classes.tabletNav}>
              <Group gap="md" className={classes.tabletNavInner}>
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`${classes.tabletLink} ${router.pathname === item.href ? classes.linkActive : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </Group>
            </Box>
          )}

          {/* Right Section */}
          <Group className={classes.rightSection}>
            {/* Social Icons - Solo visible en desktop */}
            {!isMobile && (
              <Group className={classes.socialIcons} gap="xs">
                <ActionIcon
                  variant="subtle"
                  size={isTablet ? "md" : "lg"}
                  component="a"
                  href="#"
                  className={classes.socialIcon}
                >
                  <IconBrandFacebook size={isTablet ? 16 : 20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  size={isTablet ? "md" : "lg"}
                  component="a"
                  href="#"
                  className={classes.socialIcon}
                >
                  <IconBrandTwitter size={isTablet ? 16 : 20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  size={isTablet ? "md" : "lg"}
                  component="a"
                  href="#"
                  className={classes.socialIcon}
                >
                  <IconHelp size={isTablet ? 16 : 20} />
                </ActionIcon>
              </Group>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                className={classes.burger}
                size="sm"
              />
            )}
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Group>
            <Box className={classes.logoIcon}>
              <IconHelp size={24} color="#4A90E2" />
            </Box>
            <Text size="lg" fw={700} c="#4A90E2">
              Menú
            </Text>
          </Group>
        }
        size="sm"
        position="right"
        className={classes.drawer}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Stack gap="sm">
          {navigation.map((item) => (
            <UnstyledButton
              key={item.name}
              component={Link}
              href={item.href}
              className={`${classes.mobileLink} ${router.pathname === item.href ? classes.mobileLinkActive : ''}`}
              onClick={() => setOpened(false)}
            >
              <Text size="md" fw={500}>
                {item.name}
              </Text>
            </UnstyledButton>
          ))}
          
          <Box className={classes.mobileSocial}>
            <Text size="sm" fw={500} mb="xs" c="dimmed">Síguenos</Text>
            <Group gap="xs">
              <ActionIcon
                variant="light"
                size="lg"
                component="a"
                href="#"
                className={classes.socialIcon}
              >
                <IconBrandFacebook size={20} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="lg"
                component="a"
                href="#"
                className={classes.socialIcon}
              >
                <IconBrandTwitter size={20} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="lg"
                component="a"
                href="#"
                className={classes.socialIcon}
              >
                <IconHelp size={20} />
              </ActionIcon>
            </Group>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
