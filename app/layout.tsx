import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajinkyabhamre.me"),
  title: {
    default: "Ajinkya Bhamre | Full-Stack Software Engineer",
    template: "%s | Ajinkya Bhamre",
  },
  description:
    "Full-stack software engineer specializing in MERN stack, TypeScript, and AWS. Masters in Software Engineering from Stevens Institute. Building scalable web applications with modern technologies.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "MERN Stack",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
    "Next.js",
    "Ajinkya Bhamre",
    "Stevens Institute of Technology",
    "MongoDB",
    "GraphQL",
    "Web Development",
  ],
  authors: [{ name: "Ajinkya Bhamre", url: "https://ajinkyabhamre.me" }],
  creator: "Ajinkya Bhamre",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajinkyabhamre.me",
    title: "Ajinkya Bhamre | Full-Stack Software Engineer",
    description:
      "Full-stack software engineer specializing in MERN stack, TypeScript, and AWS. Building scalable web applications with modern React, Node.js, and cloud technologies.",
    siteName: "Ajinkya Bhamre Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajinkya Bhamre - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajinkya Bhamre | Full-Stack Software Engineer",
    description:
      "Full-stack software engineer specializing in MERN stack, TypeScript, and AWS.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ajinkya Bhamre",
    url: "https://ajinkyabhamre.me",
    image: "https://ajinkyabhamre.me/profilePic-400.webp",
    sameAs: [
      "https://www.linkedin.com/in/ajinkyabhamre/",
      "https://github.com/Ajinkyabhamre",
    ],
    jobTitle: "Full-Stack Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Stevens Institute of Technology",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Stevens Institute of Technology",
        description: "MS in Software Engineering",
      },
      {
        "@type": "EducationalOrganization",
        name: "NMIMS University",
        description: "BTech in Information Technology",
      },
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "MongoDB",
      "AWS",
      "Full Stack Development",
      "GraphQL",
      "Next.js",
      "Software Engineering",
    ],
  };

  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/profilePic-192.webp"
          as="image"
          type="image/webp"
          media="(max-width: 640px)"
        />
        <link
          rel="preload"
          href="/profilePic-400.webp"
          as="image"
          type="image/webp"
          media="(min-width: 641px)"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full sm:blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full sm:blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}