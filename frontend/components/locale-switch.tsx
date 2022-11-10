import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"

import Link from "next/link"

import Cookies from "js-cookie"
import WorldIcon from "./icons/world"

import { useOnClickOutside } from "../utils/hooks"
import { getLocalizedPage, localizePath } from "utils/localize"

const LocaleSwitch = ({ pageContext }) => {
  const isMounted = useRef(false)
  const select = useRef()
  const router = useRouter()
  const [locale, setLocale] = useState("")
  const [showing, setShowing] = useState(false)

  const handleLocaleChange = async (selectedLocale: string) => {
    // Persist the user's language preference
    // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    Cookies.set("NEXT_LOCALE", selectedLocale)
    setLocale(selectedLocale)
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)
  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE")
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale)
    }

    const checkLocaleMismatch = async () => {
      if (
        !isMounted.current &&
        localeCookie &&
        localeCookie !== pageContext.locale
      ) {
        // Redirect to locale page if locale mismatch
        const localePage = getLocalizedPage(localeCookie, pageContext)

        router.push(
          `${localizePath({ ...pageContext, ...localePage })}`,
          `${localizePath({ ...pageContext, ...localePage })}`,
          //@ts-ignore
          { locale: localePage.locale }
        )
      }
      setShowing(false)
    }

    setLocale(localeCookie || router.locale)
    checkLocaleMismatch()

    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <div ref={select} className="relative ml-4">
      <button
        type="button"
        className="flex h-full w-20 cursor-pointer items-center justify-between rounded-md py-2 px-2 hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 focus:outline-none"
        onClick={() => setShowing(!showing)}
      >
        <WorldIcon />
        <span className="capitalize">{locale}</span>
        <div className="ml-1 text-primary-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
      <div
        className={`mt-1 w-full rounded-md bg-white p-1 shadow-lg ${
          showing ? "absolute" : "hidden"
        }`}
      >
        {pageContext.localizedPaths &&
          pageContext.localizedPaths.map(({ href, locale }) => {
            return (
              <Link href={href} key={locale} locale={locale} passHref>
                <p
                  onClick={() => handleLocaleChange(locale)}
                  className="cursor-pointer rounded-md p-2 text-center capitalize hover:bg-primary-50 hover:text-primary-600"
                >
                  {locale}
                </p>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default LocaleSwitch
