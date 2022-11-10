export function getStrapiURL(path: string) {
  //  console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL)
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error("fetchAPI Error", response.url, response.statusText)
    throw new Error(
      `An error occured please try again ${response.status} ${response.statusText} ${response.url}`
    )
  }
  const data = await response.json()
  return data
}

/**
 *
 * @param {object} params The router params object with slug: { slug: [<slug>] }
 * @param {string} locale The current locale specified in router.locale
 * @param {boolean} preview router isPreview value
 */

interface IPageData {
  params: {
    slug: []
  }
  locale: string
  preview: boolean
}
export async function getPageData(params, locale, preview = false) {
  const slug = params.slug.join("/")
  // Find the pages that match this slug
  /* const pagesData = await fetchAPI(
    `/pages?slug=${slug}&_locale=${locale}&status=published${
      preview ? '&status=draft' : ''
    }`
  ) */

  const pagesData = await fetchAPI(`/pages?slug=${slug}&_locale=${locale}`)

  // Make sure we found something, otherwise return null
  if (pagesData == null || pagesData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return pagesData[0]
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale: string) {
  let language
  if (!locale) {
    language = "de"
  } else {
    language = locale
  }

  const global = await fetchAPI(`/global?_locale=${language}`)
  return global
}

export async function getDynamicRT(slug: string) {
  const richTextData = await fetchAPI(`/dynamic-rich-texts?slug=${slug}`)

  if (richTextData == null || richTextData.length === 0) {
    return null
  }

  return richTextData[0]
}
