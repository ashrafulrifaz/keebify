import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./provider/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Keebify",
  description: "keyboard selling website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">
          <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  );
}
