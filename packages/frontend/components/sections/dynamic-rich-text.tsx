import React, { Fragment, ReactElement, useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import { useQuery } from "react-query"
import MarkdownRender from "utils/MarkdownRender"
import { getDynamicRT } from "utils/api"
import { useRouter } from "next/router"
import slugify from "slugify"
import { queryClient } from "pages/_app"

interface DynamicRichText {
  id: number
  shortName: string
  slug: string
  content: string
  published_at: Date
  created_at: Date
  updated_at: Date
}

interface RichTextSelektor {
  id: number
  label?: any
  dynamic_rich_text: DynamicRichText
}

interface Props {
  data: {
    __component: string
    id: number
    content: string
    RichTextSelektor: RichTextSelektor[]
  }
}

function DynamicRichText({ data }: Props): ReactElement {
  //

  const router = useRouter()
  const [selected, setSelected] = useState({
    slug: data?.RichTextSelektor[0].dynamic_rich_text?.slug,
    shortName: data?.RichTextSelektor[0].dynamic_rich_text?.shortName,
  })

  /* useEffect(() => {
    window.dataLayer.push({
      event: 'dynamic-content',
      selected: selected.name,
    })
    return () => {
      // window.dataLayer.push({
      //  event: 'dynamic-content',
      //  selected: selected.name,
      //}) 
    }
  }, [selected]) */

  const [dyHide, setDyHide] = useState(true)

  const {
    status,
    data: dynamicData,
    error,
  } = useQuery(["dynRichText", selected.slug], async () =>
    getDynamicRT(selected.slug)
  )

  const handleChange = () => {
    // console.log('Start handleChange')
    window.dataLayer.push({
      event: "test",
    })
    // console.log('END handleChange')
  }

  useEffect(() => {
    if (router.query.dyn) {
      const shortName = router.query.dyn
      const slug: string = slugify(router.query.dyn as string, {
        locale: "de",
        lower: true,
      })
      //@ts-ignore
      setSelected({ slug, shortName })
    }
  }, [router.query.dyn])

  const prefetchDynamicContent = async () => {
    data.RichTextSelektor.map(async (item) => {
      await queryClient.prefetchQuery(
        ["dynRichText", item.dynamic_rich_text.slug],
        async () => getDynamicRT(item.dynamic_rich_text.slug)
      )
    })
  }

  useEffect(() => {
    prefetchDynamicContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (dynamicData)
    return (
      <div className="mx-auto my-4 w-full max-w-prose px-4 sm:my-8 sm:px-8 md:max-w-3xl">
        {/* <button className="m-2 bg-primary-500 text-white" onClick={handleChange}>
        Test DataLayer
      </button> */}

        <div className="divide-y divide-primary-300 overflow-hidden rounded-lg bg-white shadow shadow-primary-500/75">
          <div className="px-4 py-5 sm:px-6">
            <MarkdownRender>{data.content}</MarkdownRender>
          </div>
          <div className="relative px-4 py-5 sm:p-6">
            <div
              className="mx-auto max-w-prose"
              onClick={() => setDyHide(false)}
            >
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">
                      {" "}
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pr-10 pl-3 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm">
                        <span className="block truncate">
                          {selected.shortName}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {data.RichTextSelektor.map((item) => (
                            <div key={item.id}>
                              <Listbox.Option
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-primary-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={item.dynamic_rich_text}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {item.dynamic_rich_text.shortName}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-primary-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            </div>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            <div className="my-2 mx-auto min-h-min py-14 lg:px-8">
              <MarkdownRender>{dynamicData.content}</MarkdownRender>
            </div>
          </div>
        </div>
      </div>
    )

  return null
}

export default DynamicRichText
