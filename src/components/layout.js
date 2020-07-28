import React from "react"
import Footer from "./footer"

import { rhythm } from "../utils/typography"
import Navbar from "./navbar"

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
