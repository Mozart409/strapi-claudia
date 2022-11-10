import MarkdownRender from "utils/MarkdownRender"
import ButtonLink from "../elements/button-link"
import CustomImage from "../elements/image"
import { getButtonAppearance } from "utils/button"
import React, { ReactElement, useState } from "react"
import Link from "next/link"
import CustomLink from "./custom-link"

export interface GradientHero {
  data: {
    component: string
    id: number
    title: string
    blackText: string
    coloredText: string
    content: string
    title_color: "black" | "orange" | "green" | "yellow" | "blue" | "red"
    seminarcard: Seminarcard[]
  }
}

interface Seminarcard {
  id: number
  category: string
  content: string
  url: string
  newTab: boolean
  text: string
  tilte: string
  image: IMedia
}

/* interface IGradientHero {
  data: {
    __component: string
    id: number
    title: string
    black_text: string
    colored_text: string
    content: string
    title_color: 'black' | 'orange' | 'green' | 'yellow' | 'blue' | 'red'
    seminarcard: {
      id: number
      category: string
      content: string
      url: string
      newTab: boolean
      text: string
      tilte: string
      image: IMedia
    }[]
  }
} */

const SingleCard = ({
  category,
  content,
  id,
  url,
  newTab,
  text,
  tilte,
  image,
}: Seminarcard) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      key={id}
      onClick={() => setIsOpen(!isOpen)}
      className="flex h-full flex-col overflow-y-auto rounded-lg shadow-lg"
    >
      <Link href={url}>
        <a
          // Change target and rel attributes is newTab is turned on
          target={newTab ? "_blank" : "_self"}
          rel={newTab ? "noopener noreferrer" : ""}
          title={tilte}
        >
          <div className="relative flex-shrink-0">
            <CustomImage
              className="h-96 w-full object-cover"
              media={image}
              width={1000}
              height={700}
            />
            <div className="absolute bottom-0 left-0 w-full">
              <div className="mx-auto flex flex-1 flex-col justify-between bg-white py-2 px-6">
                <div className="flex-1">
                  <p className="text-md bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-left font-bold text-transparent">
                    {category}
                  </p>
                  <div className="justify-left mt-2 flex">
                    <MarkdownRender>{text}</MarkdownRender>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

function GradientHero({ data }: GradientHero): ReactElement {
  return (
    <div>
      {/* <div>
        <pre>{JSON.stringify(data.seminarcard, null, 2)}</pre>
      </div> */}
      <div className="relative mx-auto max-w-5xl">
        <div className="relative mx-auto rounded">
          <div className="absolute inset-0 z-0 h-[85vh] max-w-7xl">
            <div className="cssgradient h-[85vh] lg:h-[75vh] xl:h-[65vh] 2xl:h-[85vh]"></div>
          </div>
          <div className="relative m-8">
            <div className="absolute inset-0">
              <div className="h-1/3 sm:h-2/3"></div>
            </div>
            <div className="relative mx-auto max-w-7xl">
              <div className="pt-8 text-center">
                <MarkdownRender>{data.content}</MarkdownRender>
              </div>

              <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-3 lg:max-w-none lg:grid-cols-1">
                {data.seminarcard?.map((node) => (
                  <div key={node.id}>
                    {/* {JSON.stringify(node, null, 2)} */}
                    <SingleCard {...node} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradientHero
