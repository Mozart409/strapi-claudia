import classNames from "classnames"
import MarkdownRender from "utils/MarkdownRender"
const LevelRow = ({ data: { id, title, titleColor, content } }) => {
  return (
    <div key={id}>
      <div className="mx-auto mt-8 max-w-prose">
        <ul className="mx-auto max-w-prose py-4">
          <li className="list-check list-inside align-baseline">
            <span className="text-left text-2xl font-bold text-black">
              {title}
            </span>

            <div>
              <div className="mx-auto max-w-prose md:max-w-3xl lg:ml-10">
                <MarkdownRender>{content}</MarkdownRender>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LevelRow
