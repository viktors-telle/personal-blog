import React from "react"
import styled from "styled-components"
import { Link, StaticQuery, graphql } from "gatsby"

const NavItem = styled(Link)`
  text-decoration: none;
  color: #111 !important;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    height: 1px;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const NavbarLinks = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteMenuLinksQuery {
          site {
            siteMetadata {
              menuLinks {
                name
                link
              }
            }
          }
        }
      `}
      render={(data) => {
        const menuLinks = data.site.siteMetadata.menuLinks
        return menuLinks.map((link) => {
          return (
            <NavItem key={link.name} to={link.link}>
              {link.name}
            </NavItem>
          )
        })
      }}
    />
  )
}

export default NavbarLinks
