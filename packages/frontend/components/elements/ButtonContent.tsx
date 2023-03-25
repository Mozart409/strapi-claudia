import classNames from "classnames"

export const ButtonContent = ({ button, appearance, compact }) => {
  return (
    <div
      className={classNames(
        // Common classes
        "block w-full rounded-md border-2 text-center text-base font-semibold uppercase tracking-wide md:text-sm lg:w-auto",
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
          "border-primary-600 bg-primary-600 text-white": appearance === "dark",
        },
        // Specific to when the button is dark outlines
        {
          "border-primary-600 text-primary-600": appearance === "dark-outline",
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
      {button.text}
    </div>
  )
}
