import CustomButton from "@/components/elements/custom-button"
import Link from "next/link"
import { useEffect } from "react"
export default function Custom404() {
  useEffect(() => {
    window.dataLayer.push({ event: "404 page hit" })
  }, [])
  return (
    <div className="my-auto">
      <div className="min-h-full bg-white py-16 px-4 sm:py-24 sm:px-6 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <div className="sm:flex">
            <p className="text-4xl font-extrabold text-primary-600 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  An error occurred
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/">
                  <a>
                    <CustomButton text="Go back home." />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
