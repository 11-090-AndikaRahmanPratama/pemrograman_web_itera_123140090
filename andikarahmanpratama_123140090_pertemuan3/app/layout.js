import "../styles/globals.css";

export const metadata = {
  title: "Book Management App",
  description: "A simple book management application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
