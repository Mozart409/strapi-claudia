import React from "react"
import { fetchAPI } from "utils/api"

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN
const CMS_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL

const createSitemap = (pages) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
                    </url>
                `
          })
          .join("")}
                   
    </urlset>
    `

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const request = await fetch(CMS_URL + "/pages")

    const pages = await request.json()

    res.setHeader("Content-Type", "text/xml")
    res.write(createSitemap(pages))
    res.end()
  }
}

export default Sitemap
