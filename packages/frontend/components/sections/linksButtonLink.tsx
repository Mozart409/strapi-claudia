import { FC } from "react"
import { ButtonContent } from "../elements/ButtonContent"
import CustomLink from "./custom-link"

interface Props {
  data: {
    __component: string
    id: number
    url: string
    newTab: boolean
    text: string
    type: string
  }
}

const linksButtonLink: FC<Props> = ({ data }) => {
  let link = {
    url: data.url,
    newTab: data.newTab,
  }
  return (
    <div key={data.id} className="my-6 mx-auto max-w-prose md:max-w-3xl">
      <CustomLink link={link}>
        <ButtonContent button={data} appearance="dark" compact={false} />
      </CustomLink>
    </div>
  )
}
export default linksButtonLink
