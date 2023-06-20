import "@/css/globals.css";
import { Metadata } from "next";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const iconFile: Icon = {
	url: "icon.svg",
	type: "image/svg",
};

export const metadata: Metadata = {
	title: "BL",
	description: "BL Site",
	icons: {
		icon: iconFile,
		shortcut: iconFile,
	},
	other: {
		rel: "apple-touch-icon-precomposed",
		url: iconFile.url as string,
	},
	viewport: {
		initialScale: 1,
		width: "device-width",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
