import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ticktock",
  description: "Timesheet Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: "16px",
                borderRadius: "8px",
                padding: "12px 16px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
