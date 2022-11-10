import MarkdownRender from "utils/MarkdownRender"
type RichTextProps = {
  data: {
    content: string
  }
}
const RichText: React.FC<RichTextProps> = ({ data }) => {
  return (
    <div className="py-6 selection:bg-primary-300 selection:text-primary-900 lg:text-left">
      <div className="mb-4 px-4 sm:px-8">
        <div className="prose prose-lg mx-auto max-w-prose md:mt-5 md:max-w-3xl xl:prose-lg">
          <MarkdownRender>{data.content}</MarkdownRender>
        </div>
      </div>
    </div>
  )
}
export default RichText
