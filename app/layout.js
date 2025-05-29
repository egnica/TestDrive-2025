import "./globals.css";
import styles from "./page.module.css";
import Image from "next/image";
export const metadata = {
  title: "Test Drive 2025",
  description: "Test Drive 2025",
};

export default function RootLayout({ children }) {
  const logo =
    "https://barlowresearch.com/wp-content/uploads/2024/06/barlow-row-blk-logo.png";

  return (
    <html lang="en">
      <head>
        {/* ✅ Futura font via local or fallback stack */}
        <style>{`
          @font-face {
            font-family: 'Futura';
            src: local('Futura'), url('/fonts/futura.woff2') format('woff2');
            font-display: swap;
          }
        `}</style>
      </head>

      <body style={{ fontFamily: "Futura, sans-serif" }}>
        <header>
          <a href="https://mybarlow.barlowresearch.com/mybarlow/index.php">
            <Image src={logo} width={270} height={70} alt="barlow logo" />
          </a>
          <h1>DIGITAL BUSINESS BANKING TEST DRIVE</h1>
        </header>

        {children}
      </body>
    </html>
  );
}
