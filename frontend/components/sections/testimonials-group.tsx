import classNames from "classnames"
import { FC, useState } from "react"
import NextImage from "../elements/image"
import CustomImage from "../elements/custom-image"
import { TestimonialsProps } from "interfaces/testimonial"
import CustomLink from "../elements/custom-link"

const TestimonialsGroup: FC<TestimonialsProps> = ({ data }) => {
  // Only show one testimonial at a time
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0)
  const selectedTestimonial = data.testimonials[selectedTestimonialIndex]
  return (
    <>
      <section className="overflow-hidden bg-gray-50 py-12 md:py-20 lg:py-24">
        <CustomLink link={data.link}>
          <div className="mx-auto px-4 pb-4 sm:px-6 lg:py-8 lg:px-8">
            <div className="text-center">
              {/* <h2 className="text-base font-semibold uppercase tracking-wide text-primary-600">
            Pricing
          </h2> */}
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                {data.title}
              </p>
              <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                {data.description}
              </p>
            </div>
          </div>
        </CustomLink>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <svg
            className="absolute top-full right-full translate-x-1/3 -translate-y-1/4 transform lg:translate-x-1/2 xl:-translate-y-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            role="img"
            aria-labelledby="svg-background"
          >
            <title id="svg-background">background</title>
            <defs>
              <pattern
                id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
            />
          </svg>

          <div className="relative">
            <CustomLink link={selectedTestimonial.link}>
              <div className="relative mx-auto h-16 w-16 rounded-full">
                <CustomImage
                  className="mx-auto"
                  layout="fill"
                  media={selectedTestimonial.logo}
                />
              </div>
            </CustomLink>
            <blockquote className="mt-10">
              <div className="mx-auto max-w-3xl text-center text-2xl font-medium leading-9 text-gray-900">
                <p>&ldquo;{selectedTestimonial.text}&rdquo;</p>
              </div>
              <footer className="mt-8">
                <CustomLink link={selectedTestimonial.link}>
                  <div className="md:flex md:items-center md:justify-center">
                    <div className="md:flex-shrink-0">
                      <div className="mx-auto h-32 w-32 rounded-full">
                        <CustomImage
                          layout="responsive"
                          className="rounded-full"
                          media={selectedTestimonial.picture}
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                      <div className="relative pt-12 text-base font-medium text-gray-900 md:mt-0 md:pt-0 ">
                        {selectedTestimonial.authorName}
                      </div>

                      <svg
                        className="mx-1 hidden h-5 w-5 text-primary-600 md:block"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 0h3L9 20H6l5-20z" />
                      </svg>

                      <div className="text-base font-medium text-gray-500">
                        {selectedTestimonial.authorTitle}
                      </div>
                    </div>
                  </div>
                </CustomLink>
              </footer>
              {data.testimonials.length > 1 && (
                <div className="mt-10 flex flex-row justify-center gap-4">
                  {data.testimonials.map((testimonial, index) => (
                    <button
                      onClick={() => setSelectedTestimonialIndex(index)}
                      className={classNames(
                        // Common classes
                        "h-3 w-3 rounded-full",
                        {
                          "bg-gray-500": index !== selectedTestimonialIndex,
                          "bg-primary-600": index === selectedTestimonialIndex,
                        }
                      )}
                      key={testimonial.id}
                    />
                  ))}
                </div>
              )}
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-6 px-6 sm:gap-20 sm:px-0">
                {data.logos.map((logo) => (
                  <NextImage
                    key={logo.id}
                    width="120"
                    height="33"
                    media={logo.logo}
                  />
                ))}
              </div>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  )
}
export default TestimonialsGroup
