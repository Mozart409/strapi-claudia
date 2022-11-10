import { useState } from "react"
import { fetchAPI } from "utils/api"
import * as yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import toast from "react-hot-toast"
import slugify from "slugify"

const CheckboxComponent = ({ data }) => {
  if (data.length > 0)
    return (
      <div>
        <label
          htmlFor="checkbox"
          className="mt-2 block text-left text-sm font-medium text-gray-700"
        >
          Check
        </label>
        <Field
          name="checkbox"
          as="select"
          className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 pr-10 pl-3 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
        >
          {data.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </Field>
        <ErrorMessage
          render={(msg) => <p className="error-style capitalize">{msg}</p>}
          name="checkbox"
        />
      </div>
    )
  return null
}

const LeadForm = ({ data }) => {
  const [loading, setLoading] = useState(false)

  const LeadSchema = yup.object().shape({
    name: yup.string().optional(),
    email: yup.string().email().required(),
    tel: yup.number().optional(),
    subject: yup.string().optional(),
    message: yup.string().required(),
  })

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
      <div className="overflow-hidden bg-white py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Formik
            initialValues={{
              name: "",
              email: "",
              tel: "",
              subject: "",
              message: "",
              checkbox: "",
            }}
            validationSchema={LeadSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              setLoading(true)

              try {
                setErrors({})
                const response = await fetchAPI("/lead-form-submissions", {
                  method: "POST",
                  body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    tel: values.tel,
                    subject: values.subject,
                    message: values.message,
                    checkbox: values.checkbox,
                    location: data.location,
                  }),
                })

                toast.success("Vielen Dank für Ihre Nachricht!")
                window.dataLayer.push({ event: "form-sent" })
              } catch (err) {
                setErrors({})
                window.dataLayer.push({
                  event: "form-error",
                })
                toast.error(err.message)
              }

              setLoading(false)
              setSubmitting(false)
              toast.success("Nachricht gesendet")
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <div className="max-w-prose">
                <Form className="flex flex-col gap-4">
                  <label
                    htmlFor="name"
                    className="mt-2 block text-left text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <Field
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name="name"
                    placeholder={data.namePlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => (
                      <p className="error-style capitalize">{msg}</p>
                    )}
                    name="name"
                  />
                  <label
                    htmlFor="email"
                    className="mt-2 block text-left text-sm font-medium text-gray-700"
                  >
                    E-Mail (*)
                  </label>
                  <Field
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="email"
                    name="email"
                    placeholder={data.emailPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => (
                      <p className="error-style capitalize">{msg}</p>
                    )}
                    name="email"
                  />
                  <label
                    htmlFor="tel"
                    className="mt-2 block text-left text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <Field
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="tel"
                    name="tel"
                    placeholder={data.telPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => (
                      <p className="error-style capitalize">{msg}</p>
                    )}
                    name="tel"
                  />
                  <label
                    htmlFor="subject"
                    className="mt-2 block text-left text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <Field
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name="subject"
                    placeholder={data.subjectPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => (
                      <p className="error-style capitalize">{msg}</p>
                    )}
                    name="subject"
                  />

                  {/* <CheckboxComponent data={data.CheckboxRow} /> */}

                  <label
                    htmlFor="message"
                    className="mt-2 block text-left text-sm font-medium text-gray-700"
                  >
                    Message (*)
                  </label>
                  <Field
                    className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    type="text"
                    name="message"
                    as="textarea"
                    rows="8"
                    placeholder={data.textPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => (
                      <p className="error-style capitalize">{msg}</p>
                    )}
                    name="message"
                  />
                  {/*   <Button
                    type="submit"
                    button={data.submitButton}
                    loading={loading}
                    appearance={'dark'}
                  /> */}

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border-2 border-primary-600 bg-primary-600 py-4 px-8 text-center text-base font-semibold uppercase tracking-wide text-white md:text-sm lg:w-auto"
                  >
                    {data.submitButton.text}
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default LeadForm
