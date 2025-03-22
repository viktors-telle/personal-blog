import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SocialLink from "./socialLink"
import styled from "styled-components"

const FooterWrapper = styled.footer`
  text-align: center;
  max-width: 64rem;
  margin: 0 auto 0 auto;

  @media (max-width: 768px) {
    padding: 0 2vw;
  }
`

const Footer = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              social {
                twitter
                linkedIn
                medium
                github
              }
            }
          }
        }
      `}
      render={(data) => {
        const { social } = data.site.siteMetadata
        return (
          <FooterWrapper>
            <SocialLink
              domain="x.com"
              userName={social.twitter}
              name="X"
            />{" "}
            |{" "}
            <SocialLink
              domain="linkedin.com/in"
              userName={social.linkedIn}
              name="LinkedIn"
            />{" "}
            |{" "}
            <SocialLink
              domain="medium.com"
              userName={social.medium}
              name="Medium"
            />{" "}
            |{" "}
            <SocialLink
              domain="github.com"
              userName={social.github}
              name="GitHub"
            />
            <p
              style={{
                textAlign: `left`,
                marginTop: `1rem`,
              }}
            >
              <small>© 2025 - Viktors Telle. All rights reserved.</small>
            </p>
          </FooterWrapper>
        )
      }}
    />
  )
}

export default Footer
