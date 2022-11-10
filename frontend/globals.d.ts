export declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }

  interface ILocale {
    locale: string
  }

  interface IMedia {
    formats: { [s: string]: unknown } | ArrayLike<unknown>
    id?: string | number
    alternativeText?: string
    caption?: string
    mime?: string
    url?: string
    width?: number
    height?: number
  }
  interface ILink {
    url: string
    id: string | number
    text: string
    title: string
    newTab: boolean
  }
  interface IButton {
    type: string
    theme: string
    text: string
    newTab: boolean
  }
}
