import "./globals.css";

export const metadata = {
  title: "NextTask",
  icons: {
    icon: "/next_task_logo.png",
    shortcut: "/next_task_logo.png",
  },
};

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
        {children}
      </body>
    </html>
  );
}
