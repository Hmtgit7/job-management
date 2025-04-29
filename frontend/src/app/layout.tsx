// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Management Portal",
  description: "Find and post job opportunities",
};

// Create a theme with consistent color scheme
const theme = createTheme({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider defaultColorScheme="light" theme={theme}>{children}</MantineProvider>
        </body>
      </html>
  );
}