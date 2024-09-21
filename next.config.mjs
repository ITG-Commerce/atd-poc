import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()(
  BuilderDevTools()({
    reactStrictMode: true,
    images: {
      domains: [process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT.replace('https://', '')],
    },
    transpilePackages: ['@storefront-ui/react'],
  })
);

export default nextConfig;
