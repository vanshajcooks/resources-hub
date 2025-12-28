import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "MLSC Resources Hub",
  description: "Roadmaps and resources for modern developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-neutral-100">
      <body
        className={`${inter.variable} min-h-full bg-neutral-950 font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
