import { ButtonContent } from "./ButtonContent"

import CustomLink from "./custom-link"

type ButtonLinkProps = {
  button?: any
  appearance?: "dark" | "white-outline" | "white" | "dark-outline"
  compact?: boolean
}
const ButtonLink: React.FC<ButtonLinkProps> = ({
  button,
  appearance,
  compact = false,
}) => {
  return (
    <CustomLink link={button}>
      <ButtonContent
        button={button}
        appearance={appearance}
        compact={compact}
      />
    </CustomLink>
  )
}
export default ButtonLink
