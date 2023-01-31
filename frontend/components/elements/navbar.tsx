import { Fragment, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useRouter } from "next/router"

import { getButtonAppearance } from "utils/button"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import LocaleSwitch from "../locale-switch"
import { INavbar } from "interfaces/navbar"

function MyLink(props) {
  let { href, children, ...rest } = props
  return (
    <div className="w-full">
      <Link
        href={href}
        className={
          "block w-full bg-white px-4 py-2 text-sm hover:bg-gray-700 hover:text-gray-300 active:bg-gray-100 active:text-gray-900"
        }
        {...rest}
      >
        {children}
      </Link>
    </div>
  )
}

const Navbar = ({ navbar, pageContext }: INavbar) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className="border-b-2 border-gray-200 py-6 sm:py-2">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <NextImage width={64} height={64} media={navbar.logo} />
            </Link>
            {/* List of links on desktop */}
            {/* <ul className="hidden flex-row gap-4 items-baseline ml-10 list-none md:flex">
            {navbar.links.map((navLink) => (
              <li key={navLink.id}>
                <CustomLink link={navLink}>
                  <div className="py-1 px-2 hover:text-gray-900">
                    {navLink.text}
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul> */}

            <ul className="ml-10 hidden list-none flex-row items-baseline gap-4 md:flex">
              {navbar.links.map((menuLink) => (
                <div key={menuLink.id}>
                  {menuLink.links[0] ? (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            <Link
                              href={menuLink.url}
                              passHref
                              title={menuLink.title}
                            >
                              {menuLink.text}
                            </Link>
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="relative z-50 py-1">
                              {menuLink.links.map((item) => (
                                <Menu.Item key={item.id}>
                                  {({ active }) => (
                                    <MyLink href={item.url}>{item.text}</MyLink>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </div>
                    </Menu>
                  ) : (
                    <div>
                      <Link href={menuLink.url} passHref title={menuLink.title}>
                        {menuLink.text}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {pageContext.localizedPaths.length > 1 && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="mr-4 block p-1 md:mr-0 md:hidden"
              aria-label="Mobile Navigation"
            >
              <div className="h-8 w-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, "light")}
                  compact
                />
              </div>
            )}
            {/* Locale Switch Desktop */}

            {pageContext.localizedPaths.length > 1 && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

export default Navbar
