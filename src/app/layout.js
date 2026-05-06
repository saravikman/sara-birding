import '../css/globals.css';

export const metadata = {
  title: 'Mina Fåglar - Sara Vikman',
  description: "Photo gallery of birds I've seen in the wild, with names and latin names.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased eqlCkr_side_left`}>{children}</body>
    </html>
  );
}
