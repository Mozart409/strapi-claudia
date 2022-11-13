import NextImage from "./image"
import CustomLink from "./custom-link"
type FooterProps = {
  footer?: {
    logo: any
    columns?: {
      id: string | number
      title: string
      links?: any[]
    }[]
    smallText: string
  }
}
const Footer: React.FC<FooterProps> = ({ footer }) => {
  return (
    <footer className="bg-gray-100 pt-12">
      <div className="container flex flex-col lg:flex-row lg:justify-between">
        <div>
          {footer.logo && (
            <NextImage width="120" height="50" media={footer.logo} />
          )}
        </div>
        <nav className="mb-10 flex flex-row flex-wrap items-start lg:justify-end lg:gap-20">
          {footer.columns.map((footerColumn) => (
            <div
              key={footerColumn.id}
              className="mt-10 w-6/12 lg:mt-0 lg:w-auto"
            >
              <p className="font-semibold uppercase tracking-wide">
                {footerColumn.title}
              </p>
              <ul className="mt-2">
                {footerColumn.links.map((link) => (
                  <li
                    key={link.id}
                    className="-mx-1 py-1 px-1 text-gray-700 hover:text-gray-900"
                  >
                    <CustomLink link={link}>{link.text}</CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="bg-gray-200 py-6 text-center text-sm text-gray-700">
        <div className="container">
          {new Date().getFullYear()} {footer.smallText}
        </div>
      </div>
    </footer>
  )
}
export default Footer
