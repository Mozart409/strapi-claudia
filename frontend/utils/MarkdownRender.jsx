/* eslint-disable react/display-name */
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import slugify from "slugify"
import classNames from "classnames"
const MarkdownRender = (props) => {
  const customRender = {
    a: ({ href, children, title, ...props }) => {
      if (href.startsWith("#")) {
        return (
          <Link href={href} title={title} className="anchor">
            {children}
          </Link>
        )
      }

      if (href.startsWith("/"))
        return (
          <Link href={href} title={title} className="internal">
            {children}
          </Link>
        )

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          className="external"
        >
          {children}
        </a>
      )
    },

    h1: ({ node, ...props }) => {
      return (
        <h1
          {...props}
          id={slugify(`${node?.children[0]?.value}`, {
            lower: true,
            locale: "de",
          })}
        />
      )
    },
    h2: ({ node, ...props }) => {
      return (
        <h2
          {...props}
          id={slugify(`${node?.children[0]?.value}`, {
            lower: true,
            locale: "de",
          })}
        />
      )
    },
    h3: ({ node, ...props }) => {
      return (
        <h3
          {...props}
          id={slugify(`${node?.children[0]?.value}`, {
            lower: true,
            locale: "de",
          })}
        />
      )
    },
    h4: ({ node, ...props }) => {
      return (
        <h4
          {...props}
          id={slugify(`${node?.children[0]?.value}`, {
            lower: true,
            locale: "de",
          })}
        />
      )
    },
    h5: ({ node, ...props }) => {
      return (
        <h5
          {...props}
          id={slugify(`${node?.children[0]?.value}`, {
            lower: true,
            locale: "de",
          })}
        />
      )
    },
    h6: ({ node, ...props }) => {
      return (
        <h6
          {...props}
          id={slugify(`${node?.children[0]?.value}`, {
            lower: true,
            locale: "de",
          })}
        />
      )
    },

    /*  heading: ({ node, level, ...props }) => {
      switch (level) {
        case 1:
          return (
            <h1
              {...props}
              id={slugify(`${node?.children[0]?.value}`, {
                lower: true,
                locale: 'de',
              })}
            />
          )
        case 2:
          return (
            <h2
              {...props}
              id={slugify(`${node?.children[0]?.value}`, {
                lower: true,
                locale: 'de',
              })}
            />
          )
        case 3:
          return (
            <h3
              {...props}
              id={slugify(`${node?.children[0]?.value}`, {
                lower: true,
                locale: 'de',
              })}
            />
          )
        case 4:
          return (
            <h4
              {...props}
              id={slugify(`${node?.children[0]?.value}`, {
                lower: true,
                locale: 'de',
              })}
            />
          )
        case 5:
          return (
            <h5
              {...props}
              id={slugify(`${node?.children[0]?.value}`, {
                lower: true,
                locale: 'de',
              })}
            />
          )
        case 6:
          return (
            <h6
              {...props}
              id={slugify(`${node?.children[0]?.value}`, {
                lower: true,
                locale: 'de',
              })}
            />
          )
        default:
          break
      }
    }, */
  }

  return (
    <div>
      <ReactMarkdown
        className={
          "prose prose-lg mx-auto prose-headings:underline prose-a:text-primary-600 md:prose-lg lg:prose-2xl"
        }
        skipHtml={true}
        components={customRender}
      >
        {props.children}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRender
