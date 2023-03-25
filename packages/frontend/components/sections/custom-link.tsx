import Link from "next/link"
import React from "react"

const CustomLink = ({ link, children }) => {
  if (typeof link.url === "string") {
    if (link?.url?.startsWith("/")) {
      // For internal links, use the Next.js Link component
      return (
        <Link href="/[[...slug]]" as={link?.url} title={link?.title}>
          {children}
        </Link>
      )
    }

    // Plain <a> tags for external links
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        href={link?.url}
        // Change target and rel attributes is newTab is turned on
        target={link?.newTab ? "_blank" : "_self"}
        rel={link?.newTab ? "noopener noreferrer" : ""}
        title={link?.title}
      >
        {children}
      </a>
    )
  }

  if (typeof link?.url === "object") {
    if (link?.url?.url.startsWith("/")) {
      // For internal links, use the Next.js Link component
      return (
        <Link href="/[[...slug]]" as={link?.url?.url} title={link?.url?.title}>
          {children}
        </Link>
      )
    }

    // Plain <a> tags for external links
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        href={link?.url?.url}
        // Change target and rel attributes is newTab is turned on
        target={link?.newTab ? "_blank" : "_self"}
        rel={link?.newTab ? "noopener noreferrer" : ""}
        title={link?.title}
      >
        {children}
      </a>
    )
  }

  return null
}

export default CustomLink
