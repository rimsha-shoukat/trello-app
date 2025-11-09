import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-[100%] h-[100%]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          {children} 
        </ThemeProvider>
      </body>
    </html>
  );
}
