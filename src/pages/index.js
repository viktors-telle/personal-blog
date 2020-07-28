import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "My website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[
            `Blog`,
            `Software Development`,
            `C#`,
            `.NET`,
            `DevOps`,
            `React`,
            `Clean Code`,
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
          developer with 12+ years of experience. I have worked at a variety of
          companies ranging from small startups to enterprise companies.
        </p>
        <p>
          My focus is primarily on developing applications using .NET Core and
          SPA frameworks like React and Angular. I also have experience in
          creating up CI/CD pipelines in TeamCity, Octopus Deploy, and Azure
          DevOps. I also have experience in coaching and mentoring other
          developers for the last five years.
        </p>
        <p>
          Occasionally I share my personal work experience in my{" "}
          <Link style={{ color: `black` }} to="/blog">
            blog
          </Link>
        </p>
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
