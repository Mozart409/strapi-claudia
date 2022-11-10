import React, { useState } from "react"
import Navbar from "./elements/navbar"
import Footer from "./elements/footer"
import NotificationBanner from "./elements/notification-banner"

interface IColumItem {
  id: 1
  title: string
  links: IColumItemLink[]
}

interface IColumItemLink {
  id: number
  url: string
  newTab: boolean
  text: string
  title: string
}

interface Props {
  children: JSX.Element | JSX.Element[]
  global: {
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

    footer: {
      logo: IMedia
      favicon: IMedia
      id: number
      smallText: string
      columns: IColumItem[]
    }
    notificationBanner: {
      id: number
      text: string
      type: "info" | "warning" | "alert"
    }
  }
  pageContext
}

const Layout = ({ children, global, pageContext }: Props) => {
  const { navbar, footer, notificationBanner } = global

  const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <div className="flex min-h-screen flex-col justify-between font-sans antialiased">
      {/* Aligned to the top */}
      <div className="flex-1">
        {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <Navbar navbar={navbar} pageContext={pageContext} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
      {/* Aligned to the bottom */}
      <Footer footer={footer} />
    </div>
  )
}

export default Layout
