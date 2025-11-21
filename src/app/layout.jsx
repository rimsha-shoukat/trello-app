import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/toast-provider.jsx";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen min-w-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <ToastProvider />
          {children} 
        </ThemeProvider>
      </body>
    </html>
  );
}
