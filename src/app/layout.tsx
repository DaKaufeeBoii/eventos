import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventOS",
  description: "AI-powered event operations for teams, volunteers, sponsors, and attendees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-zinc-950 text-zinc-50">{children}</body>
    </html>
  );
}
