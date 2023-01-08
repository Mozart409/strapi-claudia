/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"

import { z } from "zod"
import { useZorm } from "react-zorm"

import toast from "react-hot-toast"
import slugify from "slugify"
import { useMutation } from "react-query"
import axios from "axios"

export const FormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().min(1, { message: "Message is required" }),
  tel: z.string().optional(),
  subject: z.string().min(1, { message: "Message is required" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .transform(String),
})

function ErrorMessage(props: { message: string }) {
  return <div className="text-sm text-red-500">{props.message}</div>
}

// extract the inferred type
export type TFormSchema = z.infer<typeof FormSchema>

const LeadForm = ({ data }) => {
  const [loading, setLoading] = useState(false)

  const mutationContactForm = useMutation((newContactForm: TFormSchema) => {
    return axios.post("/api/mail", newContactForm)
  })

  const zo = useZorm("contact", FormSchema, {
    async onValidSubmit(e) {
      e.preventDefault()

      setLoading(true)

      await mutationContactForm.mutate(e.data)

      if (mutationContactForm.error) {
        console.log(mutationContactForm.error)
        window?.dataLayer?.push({
          event: "form-error",
        })
        toast.error("Fehler " + mutationContactForm.error)
      }

      toast.success("Vielen Dank für Ihre Nachricht!")
      window?.dataLayer?.push({
        event: "form-sent",
      })

      setLoading(false)
    },
  })
  const disabled = zo.validation?.success === false

  return (
    <div className="py-10 text-center">
      <h2
        id={slugify(`${data.title}`, {
          lower: true,
          locale: "de",
        })}
        className="mb-10 text-3xl font-bold"
      >
        {data.title}
      </h2>

      {/* <div>
        {mutationContactForm.isLoading ? (
          "Adding todo..."
        ) : (
          <>
            {mutationContactForm.isError ? (
              <div>
                An error occurred: {mutationContactForm.error.toString()}
              </div>
            ) : null}

            {mutationContactForm.isSuccess ? <div>Todo added!</div> : null}

            <button
              onClick={() => {
                mutationContactForm.mutate({
                  email: "amadeus@gmail.com",
                  subject: "Test",
                  name: "Test",
                  message: "TESTTEST",
                })
              }}
            >
              Create FORM
            </button>
          </>
        )}
      </div> */}

      <div className="overflow-hidden bg-white py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <div className="mx-auto max-w-xl">
          <form ref={zo.ref}>
            {/* {usePostForm.error && (
              <h5 onClick={() => usePostForm.reset()}>
                Form Error {usePostForm.error.toString()}
              </h5>
            )} */}
            <div className="flex max-w-prose flex-col gap-4">
              <div>
                <label className="mt-2 block text-left text-sm font-medium text-gray-700">
                  Name
                  <input
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name={zo.fields.name()}
                  />
                </label>
              </div>

              {zo.errors.name((e) => (
                <ErrorMessage message={e.message} />
              ))}

              <div>
                <label className="mt-2 block text-left text-sm font-medium text-gray-700">
                  E-Mail (*)
                  <input
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name={zo.fields.email()}
                  />
                </label>
              </div>

              {zo.errors.email((e) => (
                <ErrorMessage message={e.message} />
              ))}

              <div>
                <label className="mt-2 block text-left text-sm font-medium text-gray-700">
                  Telefon
                  <input
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name={zo.fields.tel()}
                  />
                </label>
              </div>

              {zo.errors.tel((e) => (
                <ErrorMessage message={e.message} />
              ))}

              <div>
                <label className="mt-2 block text-left text-sm font-medium text-gray-700">
                  Betreff (*)
                  <input
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name={zo.fields.subject()}
                  />
                </label>
              </div>

              {zo.errors.subject((e) => (
                <ErrorMessage message={e.message} />
              ))}

              {/* <CheckboxComponent data={data.CheckboxRow} /> */}

              <label className="mt-2 block text-left text-sm font-medium text-gray-700">
                Message (*)
                <textarea
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  name={zo.fields.message()}
                  /* className={zo.errors.message("errored")} */
                  rows={8}
                  placeholder={data.textPlaceholder}
                />
              </label>
              {zo.errors.message((e) => (
                <ErrorMessage message={e.message} />
              ))}

              {mutationContactForm.isLoading ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border-2 border-primary-600 bg-primary-600 py-4 px-8 text-center text-base font-semibold uppercase tracking-wide text-white md:text-sm lg:w-auto"
                >
                  {/* {data.submitButton.text} */} Sending ...
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={disabled}
                  className="flex w-full justify-center rounded-md border-2 border-primary-600 bg-primary-600 py-4 px-8 text-center text-base font-semibold uppercase tracking-wide text-white md:text-sm lg:w-auto"
                >
                  {/* Sending ... */} {data.submitButton.text}
                </button>
              )}
            </div>
            {/* <pre>
              Validation status: {JSON.stringify(zo.validation, null, 2)}
            </pre> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default LeadForm
