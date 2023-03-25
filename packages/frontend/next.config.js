/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
  images: {
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [4, 8, 16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      "localhost",
      "s3-images-strapibeammeup.s3.eu-central-1.amazonaws.com",
      "**.unsplash.com",
      "s3-images-idealcoachingfargate.s3.eu-central-1.amazonaws.com",
      "s3-images-fengshuifargate.s3.eu-central-1.amazonaws.com",
    ],
  },
  async redirects() {
    return []
  },
  async headers() {
    const headers = [
      {
        // Make all fonts immutable and cached for one year
        source: "/static/fonts/(.*?)",
        headers: [
          {
            key: "Cache-Control",
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            value: `public, max-age=31536000, immutable`,
          },
        ],
      },
      {
        // Make all other static assets immutable and cached for one hour
        source: "/static/(.*?)",
        headers: [
          {
            key: "Cache-Control",
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            value: `public, max-age=3600, immutable`,
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          // This directive helps protect against some XSS attacks
          // See https://infosec.mozilla.org/guidelines/web_security#x-content-type-options
          {
            key: "X-Content-Type-Options",
            value: `nosniff`,
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          // This directive helps protect user's privacy and might avoid leaking sensitive data in urls to 3rd parties (e.g: when loading a 3rd party asset)
          // See https://infosec.mozilla.org/guidelines/web_security#referrer-policy
          // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          // See https://scotthelme.co.uk/a-new-security-header-referrer-policy/
          {
            key: "Referrer-Policy",
            // "no-referrer-when-downgrade" is the default behaviour
            // XXX You might want to restrict even more the referrer policy
            value: `no-referrer-when-downgrade`,
          },
          {
            key: "X-Frame-Options",
            value: `SAMEORIGIN`,
          },
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self`,
          },
        ],
      },
    ]

    //  console.info("Using headers:", JSON.stringify(headers, null, 2))

    return headers
  },
}

module.exports = nextConfig
