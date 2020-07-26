import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "My personal website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[
            `blog`,
            `software-development`,
            `c#`,
            `.net`,
            `devops`,
            `react`,
          ]}
        />
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my site.</p>
        <p>
          My name is Viktors Telle, and I am a system architect and full-stack
          developer with 12+ years of experience.
        </p>
        <p>
          My focus is primarily on developing applications using .NET Core and
          SPA frameworks like React and Angular. I am also experienced in
          setting up CI/CD pipelines in TeamCity, Octopus Deploy, and Azure
          DevOps.
        </p>
        <p>
          I have coached and mentored other developers for the last 5 years.
        </p>
        <p>
          I also occasionally write about my personal experience with different
          technologies.
        </p>
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
      }
    }
  }
`
