/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
      // Setting to avoid this error:
      //   Error: Image Optimization using Next.js' default loader is not compatible with `next export`.
      //   Possible solutions:
      //     - Use `next start` to run a server, which includes the Image Optimization API.
      //     - Configure `images.unoptimized = true` in `next.config.js` to disable the Image Optimization API.
      unoptimized: true
    },
  },
}

module.exports = nextConfig
