import { MantineProvider, AppShell, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import Navbar from '@/components/navbar/Navbar';
import FloatingChat from '@/components/FloatingChat';

import Head from 'next/head';
import '@mantine/core/styles.css';
import '@/styles/globals.css';
//import '@/styles/swagger.ui.css';
import '@mantine/notifications/styles.css';
//import '@mantine/spotlight/styles.css';
//import '@mantine/dropzone/styles.css';
//import '@mantine/carousel/styles.css';
//import '@mantine/dates/styles.css';

const theme = createTheme({
  fontFamily: 'Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
  },
  colors: {
    brand: [
      '#e3f2fd',
      '#bbdefb',
      '#90caf9',
      '#64b5f6',
      '#42a5f5',
      '#4A90E2',
      '#1e88e5',
      '#1976d2',
      '#1565c0',
      '#0d47a1',
    ],
  },
  primaryColor: 'brand',
  primaryShade: 5,
  defaultRadius: 'md',
  components: {
    Title: {
      styles: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
    Button: {
      styles: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
  },
});


export default function App({ Component, pageProps }) {
  return (
    <>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications />
          <Head>
            <title>Comodoro Salud</title>
            <meta name="description" content="Tu asistente de salud personal" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link 
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap" 
              rel="stylesheet" 
            />
          </Head>
          <AppShell
            header={{ height: 70 }}
            padding="md"
          >
            <Navbar />
            <AppShell.Main>
              <Component {...pageProps} />
            </AppShell.Main>
            
            {/* Floating Chat - Available on all pages */}
            <FloatingChat />
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
