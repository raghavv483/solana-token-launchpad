
import "./globals.css";

import {Navbar} from "../components/Navbar";

import {Providers} from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`antialiased`}
      >
        
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
              <main className="w-full mx-auto pt-16 flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
