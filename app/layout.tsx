import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: {
      default: "BroadApps iOS — документация",
      template: "%s · BroadApps iOS",
    },
    description: "Публичная документация BroadApps iOS: выбор модулей, архитектурные схемы, compatibility и безопасная migration.",
    openGraph: {
      title: "BroadApps iOS",
      description: "Модули · Совместимость · Migration",
      images: [{ url: `${origin}/og-v2.png`, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "BroadApps iOS",
      description: "Модули · Совместимость · Migration",
      images: [`${origin}/og-v2.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
