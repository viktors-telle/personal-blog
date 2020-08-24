import React from "react"
import Footer from "./footer"

import { rhythm } from "../utils/typography"
import Header from "./header"
import { ToastProvider } from "react-toast-notifications"

const Layout = ({ children }) => {
  return (
    <ToastProvider autoDismiss="true">
      <Header />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(38),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </ToastProvider>
  )
}

export default Layout
