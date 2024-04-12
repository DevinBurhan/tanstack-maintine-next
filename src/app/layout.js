import { MaintineProviderWrapper } from "@/providers/MaintineProviderWrapper";
import TanstackProvider from "@/providers/TanstackProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next | Tanstack | Maintine",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <TanstackProvider>
          <MaintineProviderWrapper>{children}</MaintineProviderWrapper>
        </TanstackProvider>
      </body>
    </html>
  );
}
