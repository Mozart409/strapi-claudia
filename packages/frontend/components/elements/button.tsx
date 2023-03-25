import classNames from "classnames"
import { MouseEventHandler } from "react"

import Loader from "./loader"
type ButtonProps = {
  button?: any
  appearance?: "dark" | "white-outline" | "white" | "dark-outline"
  compact?: boolean
  loading?: boolean
  type: "submit" | "button"
  handleClick: MouseEventHandler
}
const Button: React.FC<ButtonProps> = ({
  button,
  appearance,
  compact = false,
  handleClick,
  loading = false,
  type,
}) => {
  return (
    <button onClick={handleClick} type={type}>
      <div
        className={classNames(
          // Common classes
          "flex w-full justify-center rounded-md border-2 text-center text-base font-semibold uppercase tracking-wide md:text-sm lg:w-auto",
          // Full-size button
          {
            "px-8 py-4": compact === false,
          },
          // Compact button
          {
            "px-6 py-2": compact === true,
          },
          // Specific to when the button is fully dark
          {
            "border-primary-600 bg-primary-600 text-black":
              appearance === "dark",
          },
          // Specific to when the button is dark outlines
          {
            "border-primary-600 text-primary-600":
              appearance === "dark-outline",
          },
          // Specific to when the button is fully white
          {
            "border-white bg-white text-primary-600": appearance === "white",
          },
          // Specific to when the button is white outlines
          {
            "border-white text-black": appearance === "white-outline",
          }
        )}
      >
        {loading && <Loader />}
        {button.text}
      </div>
    </button>
  )
}
export default Button
