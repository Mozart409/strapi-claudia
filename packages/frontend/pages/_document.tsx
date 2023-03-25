/* eslint-disable @next/next/next-script-for-ga */
import Document, { Html, Head, Main, NextScript } from "next/document"
import { nanoid } from "nanoid"
import Script from "next/script"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const nonce = nanoid()
    const docProps = await ctx.defaultGetInitialProps(ctx, { nonce })

    let contentSecurityPolicy = ""
    if (process.env.NODE_ENV === "production") {
      contentSecurityPolicy = `default-src 'self'; style-src 'nonce-${nonce}';`
    } /* else {
      // react-refresh needs 'unsafe-eval'
      // Next.js needs 'unsafe-inline' during development https://github.com/vercel/next.js/blob/canary/packages/next/client/dev/fouc.js
      // Specifying 'nonce' makes a modern browsers ignore 'unsafe-inline'
      contentSecurityPolicy = `default-src 'self'; style-src 'unsafe-inline'; script-src 'self' 'unsafe-eval';`
    } */

    ctx.res.setHeader("Content-Security-Policy", contentSecurityPolicy)
    return { ...docProps, nonce }
  }
  render() {
    return (
      <Html lang="de">
        <Head>
          {/* @ts-ignore */}
          <meta property="csp-nonce" content={this.props.nonce} />
          {/* <script
            id="usercentrics-cmp"
            data-settings-id={process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID}
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            async
          ></script> */}

          {/* <script
            data-usercentrics="Google Tag Manager"
            type="text/plain"
            async
            defer
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          /> */}
          <link rel="preload" href="/fonts/inter-var-latin.woff2"></link>

          <link rel="preload" href="/fonts/fira/FiraSans-Bold.woff" />
          <link rel="preload" href="/fonts/fira/FiraSans-Bold.woff2" />

          <link
            rel="preconnect"
            href="https://aggregator.service.usercentrics.eu"
          ></link>
          <link rel="preconnect" href="https://api.usercentrics.eu"></link>
        </Head>

        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id='${process.env.NEXT_PUBLIC_GTM_ID}'`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
          <Script
            id="usercentrics-cmp"
            data-settings-id={process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID}
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            async
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    )
  }
}
