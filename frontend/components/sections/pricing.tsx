import { CheckIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import Link from "next/link"

interface Pricing {
  data: {
    component: string
    id: number
    title: string
    plans: Plan[]
  }
}

interface Plan {
  id: number
  name: string
  description: string
  isRecommended: boolean | null
  price: number | null
  pricePeriod: string
  features: Feature[]
}

interface Feature {
  id: number
  name: string
}

const Pricing = ({ data }: Pricing) => {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-center">
              {data.title}
            </h2>
            {/* <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p> */}
            {/* <div className="flex relative self-center p-0.5 mt-6 bg-gray-100 rounded-lg sm:mt-8">
            <button
              type="button"
              className="relative py-2 w-1/2 text-sm font-medium text-gray-900 whitespace-nowrap bg-white rounded-md border-gray-200 shadow-sm sm:px-8 sm:w-auto focus:z-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              Monthly billing
            </button>
            <button
              type="button"
              className="relative py-2 ml-0.5 w-1/2 text-sm font-medium text-gray-700 whitespace-nowrap rounded-md border border-transparent sm:px-8 sm:w-auto focus:z-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              Yearly billing
            </button>
          </div> */}
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
            {data.plans.map((plan) => (
              <div
                key={plan.name}
                className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-sm text-gray-500">
                    {plan.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price ? plan.price : 0}
                    </span>{" "}
                    <span className="text-base font-medium text-gray-500">
                      €
                    </span>
                  </p>
                  <Link href="/kontakt">
                    <a>
                      <span className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900">
                        Buy {plan.name}
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h4 className="text-xs font-medium uppercase tracking-wide text-gray-900">
                    What&apos;s included
                  </h4>
                  <ul role="list" className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex space-x-3">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-500">
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
