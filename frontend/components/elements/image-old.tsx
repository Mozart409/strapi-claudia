import { getStrapiMedia } from "utils/media"
import Image from "next/image"

interface CustomImageProps {
  media?: IMedia
  className?: string
  width?: string | number
  height?: string | number
}

const NextImage = ({ media, className, width, height, ...props }) => {
  const { url, alternativeText } = media

  const loader = ({ src }) => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ""} {...props} />
    )
  }

  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={media.width}
      height={media.height}
      objectFit="contain"
      src={url}
      alt={alternativeText || ""}
    />
  )
}

export default NextImage
