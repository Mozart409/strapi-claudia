import * as React from "react"
import CustomLink from "../elements/custom-link"
import CustomImage from "../elements/image"

interface ILinkWrapper {
  link: ILink
  children: JSX.Element | JSX.Element[]
}

const LinkWrapper: React.FC<ILinkWrapper> = ({ children, link }) => {
  if (link) return <CustomLink link={link}>{children}</CustomLink>

  return <div>{children}</div>
}

interface IBorderWrapper {
  image_border: boolean
  children: JSX.Element | JSX.Element[]
}

const BorderWrapper: React.FC<IBorderWrapper> = ({
  children,
  image_border,
}) => {
  return (
    <div>
      {image_border ? (
        <div className="rounded border-2 border-primary-400 shadow shadow-primary-600">
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}
interface IImageSectionProps {
  data: {
    __component: string
    id: number
    small_image: boolean
    image_border: boolean
    link: ILink
    picture: IMedia
  }
}

const ImageSection: React.FC<IImageSectionProps> = ({ data }) => {
  return (
    <div className="container mx-auto grid max-w-prose grid-cols-1 md:max-w-screen-md lg:max-w-screen-lg">
      <LinkWrapper link={data?.link}>
        <BorderWrapper image_border={data.image_border}>
          {data.small_image ? (
            <CustomImage
              media={data?.picture}
              width={1024}
              height={768}
              className="mx-auto w-full object-contain"
            />
          ) : (
            <CustomImage
              media={data?.picture}
              width={1024}
              height={768}
              className="mx-auto w-full object-contain"
            />
          )}
        </BorderWrapper>
      </LinkWrapper>
    </div>
  )
}

export default ImageSection
