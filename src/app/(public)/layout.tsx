import { Toaster } from "react-hot-toast";
import "../globals.css";

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
        <div className="w-screen h-screen bg-white-200 flex p-4">
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <div className="w-full md:w-1/2 h-full border-1 border-gray-200 rounded p-10 flex flex-col justify-center items-center">
            {children}
          </div>

          <div
            className="hidden md:block w-1/2 h-full border border-gray-200 rounded bg-cover bg-center"
            style={{ backgroundImage: "url('/fundo_login.jpg')" }}
          />
        </div>
      </body>
    </html>
  );
}
