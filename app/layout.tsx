import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Provider from "@/components/providers/Provider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charina Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <main className="app">
              <Nav />
              {children}
              <ModeToggle />
              <Toaster />
              <br />
              <Footer />
            </main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
