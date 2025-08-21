import React, { useState, useEffect } from 'react';
import {
  Box,
  ActionIcon,
  Stack,
  Text,
  Button,
  ScrollArea,
  Avatar,
  Group,
  Paper,
  Textarea,
  Tooltip
} from '@mantine/core';
import {
  IconMessageCircle,
  IconSend,
  IconX,
  IconRobot,
  IconUser
} from '@tabler/icons-react';
import classes from './FloatingChat.module.css';

const FloatingChat = () => {
  const [opened, setOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el Chatbot de Salud Comodoro 🏥\n\nEstoy aquí para ayudarte con información sobre salud y bienestar. Puedo orientarte sobre:\n\n• Síntomas y prevención\n• Primeros auxilios básicos\n• Información sobre medicamentos\n• Cuidados de salud general\n• Cuándo buscar atención médica\n\n¿En qué puedo ayudarte hoy? 😊",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    // Simulate bot response
    const botMessage = {
      id: messages.length + 2,
      text: "Gracias por tu consulta. Como Chatbot de Salud Comodoro, te recuerdo que mi información es educativa. Para diagnósticos o tratamientos específicos, siempre consulta con un profesional de la salud. ¿Hay algo más en lo que pueda ayudarte?",
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Tooltip label="Chat Salud Comodoro" position="left">
        <ActionIcon
          size={isMobile ? 50 : 60}
          radius="50%"
          className={classes.floatingButton}
          onClick={() => setOpened(true)}
          color="blue"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          style={{
            position: 'fixed',
            bottom: isMobile ? '15px' : '20px',
            right: isMobile ? '15px' : '20px',
            zIndex: 1001,
            boxShadow: '0 4px 20px rgba(74, 144, 226, 0.4)',
            border: '3px solid white'
          }}
        >
          <IconMessageCircle size={isMobile ? 24 : 28} />
        </ActionIcon>
      </Tooltip>

      {/* Chat Widget */}
      {opened && (
        <Box
          className={classes.chatWidget}
          style={{
            position: 'fixed',
            bottom: isMobile ? '80px' : '90px',
            right: isMobile ? '15px' : '20px',
            width: isMobile ? 'calc(100vw - 30px)' : '350px',
            maxWidth: isMobile ? '320px' : '350px',
            height: isMobile ? '400px' : '450px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid #e9ecef',
            zIndex: 1002,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <Group justify="space-between" p="md" style={{ borderBottom: '1px solid #e9ecef' }}>
            <Group>
              <Avatar size="sm" radius="xl" color="blue">
                <IconRobot size={16} />
              </Avatar>
              <Box>
                <Text size="sm" fw={600}>Salud Comodoro</Text>
                <Text size="xs" c="dimmed">Chatbot de salud</Text>
              </Box>
            </Group>
            <ActionIcon 
              variant="subtle" 
              color="gray" 
              onClick={() => setOpened(false)}
              size="sm"
            >
              <IconX size={16} />
            </ActionIcon>
          </Group>
          {/* Content */}
          <Stack gap="md" style={{ flex: 1, padding: '1rem', overflow: 'hidden' }}>
            {/* Messages Area */}
            <ScrollArea h={isMobile ? 240 : 280} type="scroll" styles={{
              root: { height: isMobile ? '240px' : '280px' },
              viewport: { paddingBottom: '0 !important' }
            }}>
              <Stack gap="sm" p="xs">
                {messages.map((message) => (
                  <Group
                    key={message.id}
                    align="flex-start"
                    gap="sm"
                    justify={message.isBot ? 'flex-start' : 'flex-end'}
                  >
                    {message.isBot && (
                      <Avatar size="sm" radius="xl" color="blue">
                        <IconRobot size={14} />
                      </Avatar>
                    )}
                    
                    <Paper
                      p="sm"
                      radius="lg"
                      bg={message.isBot ? 'blue.0' : 'blue.6'}
                      c={message.isBot ? 'dark' : 'white'}
                      maw="80%"
                    >
                      <Text size="sm" style={{ whiteSpace: 'pre-line' }}>
                        {message.text}
                      </Text>
                    </Paper>

                    {!message.isBot && (
                      <Avatar size="sm" radius="xl" color="gray">
                        <IconUser size={14} />
                      </Avatar>
                    )}
                  </Group>
                ))}
              </Stack>
            </ScrollArea>

            {/* Input Area */}
            <Group gap="xs">
              <Textarea
                placeholder="Escribe tu consulta de salud..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                autosize
                minRows={1}
                maxRows={3}
                style={{ flex: 1 }}
                radius="lg"
              />
              <ActionIcon
                size="lg"
                radius="lg"
                color="blue"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <IconSend size={16} />
              </ActionIcon>
            </Group>

            {/* Disclaimer */}
            <Text size="xs" c="dimmed" ta="center">
              Esta herramienta es informativa y no reemplaza la consulta médica profesional.
            </Text>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default FloatingChat;
