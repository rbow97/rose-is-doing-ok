import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/global.css";
import { Header } from "./components/Header/Header";
import { Container } from "./components/Container/Container";
import { MoodProvider } from "@/context/MoodContext";

const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/SpaceGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk", // Optional: if I want to use it as a CSS variable
});

export const metadata: Metadata = {
  title: "Rose is doing ok",
  description: "A scrapbook of my mental health journey",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <MoodProvider>
          <Container>
            <Header />
            {children}
          </Container>
        </MoodProvider>
      </body>
    </html>
  );
}
