import { useLockBodyScroll } from "utils/hooks"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "./button-link"
import CustomLink from "./custom-link"
import CustomImage from "./custom-image"

interface MobileNavMenuProps {
  navbar: {
    id: number
    links: {
      id: number
      url: string
      title: string
      text: string
      newTab: boolean
      links: {
        id: number
        url: string
        title: string
        text: string
        newTab: boolean
      }[]
    }[]
    button: {
      id: number
      url: string
      newTab: boolean
      text: string
      type: string
    }
    logo: IMedia
    mobileLogo: IMedia
  }
  closeSelf?(...args: unknown[]): unknown
}

const MobileNavMenu = ({ navbar, closeSelf }: MobileNavMenuProps) => {
  // Prevent window scroll while mobile nav menu is open
  useLockBodyScroll()

  return (
    <div className="fixed top-0 left-0 z-10 h-screen w-screen overflow-y-scroll bg-white pb-6">
      <div className="container flex flex-col justify-between">
        {/* Top section */}
        <div className="grid grid-flow-row grid-cols-2 items-center justify-between">
          {navbar.logo ? (
            <CustomImage
              media={navbar?.logo}
              className="h-auto w-auto object-contain"
              width={128}
              height={64}
            />
          ) : (
            <CustomImage
              media={navbar?.mobileLogo}
              className="h-auto w-auto object-contain"
              width={128}
              height={64}
            />
          )}
          {/* Close button */}
          <div className="mr-4 block justify-self-end p-1">
            <button onClick={closeSelf} className="py-1 px-1">
              <div className="h-8 w-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mx-auto flex w-9/12 flex-col justify-end">
          <ul className="mb-10 flex list-none flex-col items-baseline gap-6 text-xl">
            {navbar.links.map((navLink) => (
              <li onClick={closeSelf} key={navLink.id} className="block w-full">
                <div className=" space-y-1">
                  <CustomLink link={navLink}>
                    <div className="flex flex-row items-center justify-between pb-2 font-bold hover:text-gray-900">
                      <span>{navLink?.text}</span>

                      <div className="h-8 w-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </CustomLink>

                  <div className="ml-4">
                    {navLink.links.map((item) => (
                      <div key={item.id}>
                        <CustomLink link={item}>
                          <span>{item.text}</span>
                        </CustomLink>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {navbar.button && (
            <ButtonLink
              button={navbar.button}
              appearance={getButtonAppearance(navbar.button.type, "light")}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileNavMenu
