export interface INavbar {
  navbar: {
    id: number
    links: {
      id: number
      url: string
      title: string
      text: string
      newTab: boolean
      links: {
        id: number
        url: string
        title: string
        text: string
        newTab: boolean
      }[]
    }[]
    button: {
      id: number
      url: string
      newTab: boolean
      text: string
      type: string
    }
    logo: IMedia
    mobileLogo: IMedia
  }
  pageContext: {
    locale: string
    locales: string[]
    defaultLocale: string
    slug: string
    localizations: []
    localizedPaths: [
      {
        locale: string
        href: string
      }
    ]
  }
}
