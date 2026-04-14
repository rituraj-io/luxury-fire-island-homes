import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { OG_IMAGE, SITE, SITE_URL } from "@/lib/site";


// Body face for long-form paragraphs.
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});


// Default sans for the whole site.
const gopher = localFont({
	src: [
		{ path: "../../public/assets/fonts/Gopher-Regular.woff", weight: "400", style: "normal" },
		{ path: "../../public/assets/fonts/Gopher-Bold.woff", weight: "500", style: "normal" },
		{ path: "../../public/assets/fonts/Gopher-Black.woff", weight: "900", style: "normal" },
	],
	variable: "--font-gopher",
	display: "swap",
});


// Script display face used for flourish headings (e.g. "Welcome to").
const redondo = localFont({
	src: [
		{ path: "../../public/assets/fonts/RedondoAve-Regular.woff", weight: "400", style: "normal" },
		{ path: "../../public/assets/fonts/RedondoAve-Bold.woff", weight: "700", style: "normal" },
	],
	variable: "--font-redondo",
	display: "swap",
});


// Condensed display face used for large outlined headings.
const sofia = localFont({
	src: "../../public/assets/fonts/SofiaSansCondensed-Regular.ttf",
	variable: "--font-sofia",
	display: "swap",
});


export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#efe29d" },
		{ media: "(prefers-color-scheme: dark)", color: "#185b89" },
	],
	colorScheme: "light",
	width: "device-width",
	initialScale: 1,
};


export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${SITE.name} — ${SITE.tagline}`,
		template: `%s · ${SITE.name}`,
	},
	description: SITE.description,
	applicationName: SITE.name,
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	keywords: [
		"Fire Island real estate",
		"Fire Island homes for sale",
		"Fire Island vacation rentals",
		"Ocean Beach NY real estate",
		"Ocean Bay Park rentals",
		"Seaview Fire Island homes",
		"Kismet Fire Island",
		"Davis Park Fire Island",
		"luxury Fire Island homes",
		"Fire Island realtor",
		"Long Island beach house",
		"NY beach rentals",
	],
	authors: [{ name: SITE.name, url: SITE_URL }],
	creator: SITE.name,
	publisher: SITE.name,
	category: "real estate",
	classification: "Real Estate Agency",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: SITE_URL,
		siteName: SITE.name,
		title: `${SITE.name} — ${SITE.tagline}`,
		description: SITE.description,
		locale: SITE.locale,
		images: [
			{
				url: OG_IMAGE.url,
				width: OG_IMAGE.width,
				height: OG_IMAGE.height,
				alt: OG_IMAGE.alt,
				type: "image/webp",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${SITE.name} — ${SITE.tagline}`,
		description: SITE.description,
		images: [
			{
				url: OG_IMAGE.url,
				alt: OG_IMAGE.alt,
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		shortcut: ["/icon.svg"],
		apple: [
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
	},
	manifest: "/manifest.webmanifest",
	formatDetection: {
		email: true,
		address: true,
		telephone: true,
	},
	other: {
		"geo.region": `${SITE.address.addressCountry}-${SITE.address.addressRegion}`,
		"geo.placename": SITE.address.addressLocality,
		"geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
		ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
	},
};


// JSON-LD composite graph: RealEstateAgent + WebSite + BreadcrumbList.
const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "RealEstateAgent",
			"@id": `${SITE_URL}/#organization`,
			name: SITE.name,
			alternateName: SITE.shortName,
			url: SITE_URL,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo.svg`,
				width: 170,
				height: 70,
			},
			image: `${SITE_URL}${OG_IMAGE.url}`,
			description: SITE.description,
			slogan: SITE.tagline,
			foundingDate: SITE.founded,
			telephone: SITE.phone,
			email: SITE.email,
			priceRange: "$$$",
			address: {
				"@type": "PostalAddress",
				streetAddress: SITE.address.streetAddress,
				addressLocality: SITE.address.addressLocality,
				addressRegion: SITE.address.addressRegion,
				postalCode: SITE.address.postalCode,
				addressCountry: SITE.address.addressCountry,
			},
			geo: {
				"@type": "GeoCoordinates",
				latitude: SITE.geo.latitude,
				longitude: SITE.geo.longitude,
			},
			areaServed: SITE.areaServed.map((name) => ({
				"@type": "Place",
				name,
			})),
			sameAs: SITE.sameAs,
			contactPoint: [
				{
					"@type": "ContactPoint",
					telephone: SITE.phone,
					contactType: "sales",
					areaServed: "US",
					availableLanguage: ["English"],
				},
			],
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "5.0",
				reviewCount: "100",
				bestRating: "5",
				worstRating: "1",
			},
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: SITE.name,
			description: SITE.description,
			publisher: { "@id": `${SITE_URL}/#organization` },
			inLanguage: "en-US",
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
				},
				"query-input": "required name=search_term_string",
			},
		},
		{
			"@type": "WebPage",
			"@id": `${SITE_URL}/#webpage`,
			url: SITE_URL,
			name: `${SITE.name} — ${SITE.tagline}`,
			isPartOf: { "@id": `${SITE_URL}/#website` },
			about: { "@id": `${SITE_URL}/#organization` },
			description: SITE.description,
			primaryImageOfPage: {
				"@type": "ImageObject",
				url: `${SITE_URL}${OG_IMAGE.url}`,
				width: OG_IMAGE.width,
				height: OG_IMAGE.height,
			},
			inLanguage: "en-US",
		},
	],
};


export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`${gopher.variable} ${redondo.variable} ${sofia.variable} ${inter.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<SmoothScroll>{children}</SmoothScroll>
				<Script
					id="ld-json-organization"
					type="application/ld+json"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</body>
		</html>
	);
}
