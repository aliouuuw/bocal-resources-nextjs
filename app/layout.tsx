import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/authism/client/context/auth-context";

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Bocal Resources",
  description: "Bocal Resources - made by @aliouuuw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${questrial.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
