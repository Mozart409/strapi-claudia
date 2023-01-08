import sgMail from "@sendgrid/mail"
import type { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"
import { v4 as uuidv4 } from "uuid"
import rateLimit from "@/utils/rate-limit"
import { FormSchema } from "@/components/sections/lead-form"
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

/* try {
  await sgMail.send(msg)
} catch (error) {
  console.error(error)

  if (error.response) {
    console.error(error.response.body)
  }
} */

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  const result = FormSchema.safeParse(req.body)
  if (result.success === false) {
    // handle error then return
    result.error
    res.status(400).json({ error: "Bad Request" })
  } else {
    // do something

    try {
      await limiter.check(res, 10, "CACHE_TOKEN") // 10 requests per minute
      const { email, name, message, tel, subject } = result.data
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: email,
        from: "clauda.richter-schaar@gmx.de", // Use the email address or domain you verified above
        subject: subject || "New message from your website",
        text: message,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="de">
  <head>
    <meta charset="utf-8" />

    <title>${subject}</title>

    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

    <link rel="stylesheet" href="https://cdn.simplecss.org/simple.css" />
  </head>

  <body>
    <div>
      <h1>A new Email from ${email}</h1>
      <h2>${subject}</h2>
      <h3>${name} | ${tel}</h3>
      <p>Message:</p>
      <p>${message}</p>
    </div>
  </body>
</html>
`,
      }

      try {
        await sgMail.send(msg)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error", msg: error })
        if (error.response) {
          console.error(error.response.body)
        }
      }
      res.status(200).json({ id: uuidv4(), message: msg })
    } catch {
      res.status(429).json({ error: "Rate limit exceeded" })
    }
  }
  /* // Rest of the API logic
  res.json({ message: "Hello Everyone!" }) */
}
