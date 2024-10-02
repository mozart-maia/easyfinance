import type { Metadata } from "next";
import { Afacad, Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
// import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const afacad = Afacad({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Easy Finance",
  description: "Um aplicativo para facilitar sua vida financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Toaster />
        {/* <Theme> */}
          {children}
          {/* </Theme> */}
        </body>
    </html>
  );
}
