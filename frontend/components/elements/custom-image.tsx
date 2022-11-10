import { getStrapiMedia } from "utils/media"
import Image from "next/image"

interface CustomImageProps {
  media?: IMedia
  className?: string
  width?: string | number
  height?: string | number
  layout?: "fixed" | "intrinsic" | "fill" | "responsive"
}

const CustomImage = ({
  media,
  className,
  width,
  height,
  layout,
}: CustomImageProps) => {
  const fullUrl = getStrapiMedia(media?.url)

  if (media)
    return (
      <div>
        <Image
          src={fullUrl}
          alt={media?.alternativeText || ""}
          title={media?.caption || ""}
          layout={layout || "intrinsic"}
          className={className}
          width={width || media?.width}
          height={height || media?.height}
        />
      </div>
    )

  return <></>
}

export default CustomImage
