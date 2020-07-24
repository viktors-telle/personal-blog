import React from "react"
import { StaticQuery, graphql } from "gatsby"

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
      render={data => {
        const { social } = data.site.siteMetadata
        return (
          <footer
            style={{
              textAlign: `center`,
              margin: `24px`,
            }}
          >
            <a
              href={`https://twitter.com/${social.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            &nbsp;|&nbsp;
            <a
              href={`https://linkedin.com/in/${social.linkedIn}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;|&nbsp;
            <a
              href={`https://medium.com/@${social.medium}`}
              target="_blank"
              rel="noreferrer"
            >
              Medium
            </a>
            &nbsp;|&nbsp;
            <a
              href={`https://github.com/${social.github}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </footer>
        )
      }}
    />
  )
}
