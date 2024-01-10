/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tailwindui.com",
				pathname: "**"
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "**"
			},
            {
                protocol: "https",
                hostname: "cdn.builder.io",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
                pathname: "**"
            },
		],
	},
}

module.exports = nextConfig
