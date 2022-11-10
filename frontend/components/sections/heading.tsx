import { FC } from "react"

interface Props {
  data: {
    __component: string
    id: number
    title: string
    title_color: "black" | "orange" | "green" | "yellow" | "blue" | "red"
    title_type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }
}

const ColorWrapper = ({ children, color }) => {
  switch (color) {
    case "black":
      return (
        <span className="prose prose-lg prose-headings:text-black xl:prose-2xl">
          {children}
        </span>
      )
    case "orange":
      return (
        <span className="prose prose-lg prose-headings:text-orange-500 xl:prose-2xl xl:prose-2xl">
          {children}
        </span>
      )
    case "green":
      return (
        <span className="prose prose-lg prose-headings:text-green-500 xl:prose-2xl">
          {children}
        </span>
      )
    case "yellow":
      return (
        <span className="prose prose-lg prose-headings:text-yellow-500 xl:prose-2xl">
          {children}
        </span>
      )
    case "blue":
      return (
        <span className="prose prose-lg prose-headings:text-blue-500 xl:prose-2xl">
          {children}
        </span>
      )
    case "red":
      return (
        <span className="prose prose-lg prose-headings:text-red-500 xl:prose-2xl">
          {children}
        </span>
      )
    default:
      return (
        <span className="prose prose-lg prose-headings:text-black xl:prose-2xl">
          {children}
        </span>
      )
  }
}

const HeadingWrapper = ({ children, type }) => {
  switch (type) {
    case "h1":
      return <h1>{children}</h1>
    case "h2":
      return <h2>{children}</h2>
    case "h3":
      return <h3>{children}</h3>
    case "h4":
      return <h4>{children}</h4>
    case "h5":
      return <h5>{children}</h5>
    case "h6":
      return <h6>{children}</h6>
    default:
      return <h6>{children}</h6>
  }
}

const Heading: FC<Props> = ({ data }) => {
  return (
    <ColorWrapper key={data.id} color={data.title_color}>
      <HeadingWrapper type={data.title_type}>{data.title}</HeadingWrapper>
    </ColorWrapper>
  )
}

export default Heading
