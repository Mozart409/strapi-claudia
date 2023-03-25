import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import MarkdownRender from "utils/MarkdownRender"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"
const Hero = ({ data }) => {
  return (
    <div className="container flex flex-col items-center justify-between gap-12 py-12 md:flex-row">
      <div className="z-0 mt-6 w-full flex-shrink-0 md:mt-0 md:w-6/12">
        <NextImage media={data.picture} className="" />
      </div>

      <div className="flex-1 sm:pr-8">
        <p className="font-semibold uppercase tracking-wide">{data.label}</p>

        <h1 className="title mt-2 mb-4 sm:mt-0 sm:mb-2">{data.title}</h1>

        <p className="mb-6 text-xl">{data.description}</p>

        <div className="flex flex-row flex-wrap gap-4">
          {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "light")}
              key={button.id}
            />
          ))}
        </div>

        <div className="mt-4 sm:mt-3">
          <MarkdownRender>{data.smallTextWithLink}</MarkdownRender>
        </div>
      </div>
    </div>
  )
}
export default Hero
