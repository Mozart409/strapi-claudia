import { NextSeo } from "next-seo"
import { OpenGraph } from "next-seo/lib/types"
import Head from "next/head"
import { getStrapiMedia } from "utils/media"

type SeoProps = {
  metadata?: {
    ogDescription: string
    ogType?: "article" | "website"
    ogArticlePublishedTime?: string
    ogArticleModifiedTime?: string
    ogArticleAuthor?: string
    ogSiteName?: string
    shareImageHeight?: number
    shareImageWidth?: number
    jsonLD?: {
      [key: string]: any[]
    }
    canonicalUrl: string
    metaTitle: string
    metaDescription: string
    shareImage?: IMedia
    twitterCardType?: string
    twitterUsername?: string
  }
}
const Seo: React.FC<SeoProps> = ({ metadata }) => {
  // Prevent errors if no metadata was set
  if (!metadata) return null
  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        canonical={metadata?.canonicalUrl}
        openGraph={{
          // Title and description are mandatory
          title: metadata.metaTitle,
          description: metadata.metaDescription,
          type: metadata?.ogType,
          // IF OG type article add more metadata
          ...(metadata?.ogType === "article" && {
            article: {
              publishedTime: metadata?.ogArticlePublishedTime,
              modifiedTime: metadata?.ogArticleModifiedTime,
              authors: metadata?.ogArticleAuthor.split("!"),
            },
          }),
          site_name: metadata?.ogSiteName,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          images: [
            {
              url: getStrapiMedia(metadata.shareImage.url),
              width: metadata?.shareImageWidth || metadata?.shareImage?.width,
              height:
                metadata?.shareImageHeight || metadata?.shareImage?.height,

              alt: metadata?.shareImage?.alternativeText,
            },
          ],
        }}
        // Only included Twitter data if we have it
        twitter={{
          ...(metadata.twitterCardType && {
            cardType: metadata.twitterCardType,
          }),
          // Handle is the twitter username of the content creator
          ...(metadata.twitterUsername && { handle: metadata.twitterUsername }),
        }}
      />
      <Head>
        {metadata.shareImage.mime ? (
          <meta property="og:image:type" content={metadata.shareImage.mime} />
        ) : null}

        {metadata.jsonLD ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(metadata.jsonLD),
            }}
          />
        ) : null}
      </Head>
    </>
  )
}
export default Seo
