import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "My personal website"
    const { data } = this.props

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        social={data.site.siteMetadata.social}
      >
        <SEO
          title="Home"
          keywords={[`blog`, `development`, `javascript`, `react`]}
        />
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my site.</p>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          twitter
          linkedIn
          medium
          github
        }
      }
    }
  }
`
