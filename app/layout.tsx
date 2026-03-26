import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "은진교회", template: "%s | 은진교회" },
  description: "은진교회 — 은혜와 진리가 충만한 교회. 경기 의정부시 추동로 98",
  keywords: ["은진교회", "의정부교회", "은혜와진리", "유창재목사"],
  openGraph: {
    siteName: "은진교회",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
          <Header />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </body>
    </html>
  );
}
