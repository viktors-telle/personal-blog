import React from "react"
import Footer from "./footer"
import Header from "./header"
import { rhythm } from "../utils/typography"
import { Toaster } from "react-hot-toast"

const Layout = ({ children }) => {
  return (
    <>
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default Layout
