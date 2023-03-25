import Markdown from "react-markdown"
import classNames from "classnames"
import { MouseEventHandler } from "react"
import Ticker from "react-ticker"

interface IProps {
  data: { text: string; type: "info" | "warning" | "alert" }
  closeSelf: MouseEventHandler<HTMLButtonElement>
}

const NotificationBanner = ({ data, closeSelf }: IProps) => {
  return (
    <div>
      {/* {console.log(data.text)} <p>{JSON.stringify(data, null, 2)}</p> */}
      {data.text ? (
        <div
          className={classNames(
            // Common classes
            "px-2 py-2 text-white",
            {
              // Apply theme based on notification type
              "bg-blue-600": data.type === "info",
              "bg-orange-600": data.type === "warning",
              "bg-red-600": data.type === "alert",
            }
          )}
        >
          <div className="container flex flex-row items-center justify-between">
            <div className="rich-text-banner flex-1">
              <Ticker>
                {({ index }) => (
                  <div>
                    <Markdown>{data.text}</Markdown>
                    <p>{"         "} </p>
                  </div>
                )}
              </Ticker>
            </div>
            <button onClick={closeSelf} className="flex-shrink-0 py-1 px-1">
              <div className="h-6 w-auto text-white">
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
      ) : null}
    </div>
  )
}

export default NotificationBanner
