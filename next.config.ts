import type { NextConfig } from "next";


const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "property-images3485c-adminpanel.s3.eu-north-1.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "fire-island-events-images.s3.eu-north-1.amazonaws.com",
			},
		],
	},
};


export default nextConfig;
