import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SocialLink from "./socialLink"

export default function Footer() {
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
          <footer
            style={{
              textAlign: `center`,
              margin: `24px`,
            }}
          >
            <SocialLink
              domain="twitter.com"
              userName={social.twitter}
              name="Twitter"
            />
            &nbsp;|&nbsp;
            <SocialLink
              domain="linkedin.com/in/"
              userName={social.linkedIn}
              name="LinkedIn"
            />
            &nbsp;|&nbsp;
            <SocialLink
              domain="medium.com"
              userName={social.medium}
              name="Medium"
            />
            &nbsp;|&nbsp;
            <SocialLink
              domain="github.com"
              userName={social.github}
              name="GitHub"
            />
          </footer>
        )
      }}
    />
  )
}
