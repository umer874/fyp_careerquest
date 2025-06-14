import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import localFont from "next/font/local";
import classNames from "classnames";
import "./globals.css";
import "./styles.scss";
import "./_global.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CustomProvider from "redux/provider";
import GoogleMapsScript from "GoogleMapsScript";

export const metadata: Metadata = {
  title: "Career Quest",
  description:
    "Discover a smarter way to manage your fitness business. Connect with coaches, track progress, and manage your training business without juggling multiple apps—all in one powerful platform.",
  metadataBase: new URL("https://yourwebsite.com"), // Replace with your actual domain
  openGraph: {
    title: "Career Quest",
    description:
      "Discover a smarter way to manage your fitness business. Connect with coaches, track progress, and manage your training business without juggling multiple apps—all in one powerful platform.",
    images: [
      {
        url: "/logo.png", // Replace with your OpenGraph image URL
        width: 1200,
        height: 630,
        alt: "Career Quest",
      },
    ],
  },
};

const nexaBold = localFont({
  src: [
    {
      path: "./_assets/fonts/Nexa Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nexa-bold",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={classNames(nexaBold.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Red+Hat+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body suppressHydrationWarning>
        <CustomProvider>
          {children}
           <SpeedInsights />
          <GoogleMapsScript />
        </CustomProvider>
      </body>
    </html>
  );
}