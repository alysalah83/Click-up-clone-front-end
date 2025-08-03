import ToastsManger from "@/components/ui/ToastsManger";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "Click up | %s", default: "Click up" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative h-full w-full overflow-x-hidden text-neutral-100">
        <ToastsManger />
        {children}
      </body>
    </html>
  );
}
