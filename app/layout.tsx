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
    description: "Публичная документация модулей BroadApps iOS, матрица совместимости и release-правила.",
    openGraph: {
      title: "BroadApps iOS",
      description: "Модули. Документация. Совместимость.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "BroadApps iOS",
      description: "Модули. Документация. Совместимость.",
      images: [`${origin}/og.png`],
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
