import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EvenTix Marketplace",
  description: "Buy and sell tickets for events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased `}>{children}</body>
    </html>
  );
}
