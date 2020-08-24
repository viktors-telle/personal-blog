import React from "react"
import Footer from "./footer"

import { rhythm } from "../utils/typography"
import Navbar from "./navbar"
import { ToastProvider } from "react-toast-notifications"

const Layout = ({ children }) => {
  return (
    <ToastProvider autoDismiss="true">
      <Navbar />
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
