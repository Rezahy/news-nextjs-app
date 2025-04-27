import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NewsStoreProvider } from "@/providers/news-store-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import AppToaster from "@/components/app-toaster";
import Footer from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "News App",
	description: "Nextjs News App",
	keywords: [
		"react",
		"nextjs",
		"clerk.js",
		"gnews api",
		"zustand",
		"shadcn ui",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NewsStoreProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider>
							<AppSidebar />
							<main className="w-screen">
								<SidebarTrigger className="mt-5 ml-5" />
								<section className="max-w-6xl mx-auto">{children}</section>
							</main>
							<div className="absolute top-5 right-5">
								<ModeToggle />
							</div>
						</SidebarProvider>
						<AppToaster />
						<Footer />
					</ThemeProvider>
				</NewsStoreProvider>
			</body>
		</html>
	);
}
