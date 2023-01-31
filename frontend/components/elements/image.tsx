import { getStrapiMedia } from "utils/media"
import Image from "next/legacy/image"

interface CustomImageProps {
  media?: IMedia
  className?: string
  width?: string | number
  height?: string | number
}

const NextImage = ({ media, ...props }: CustomImageProps) => {
  const fullUrl = getStrapiMedia(media.url)

  return (
    <div>
      <Image
        src={fullUrl}
        alt={media?.alternativeText || ""}
        title={media?.caption || ""}
        layout="intrinsic"
        className={props.className}
        width={props.width || media?.width}
        height={props.height || media?.height}
      />
    </div>
  )
}
/*   const { url, alternativeText } = media

  const loader = ({ src }) => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ''} {...props} />
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
      alt={alternativeText || ''}
    />
  )
} */

export default NextImage
