import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MainPhoto from "../components/mainPhoto"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "My website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[
            `Blog`,
            `Personal experience`,
            `Software development`,
            `C#`,
            `.NET`,
            `DevOps`,
            `React`,
            `Clean code`,
            `Family man`,
            `Viktors Telle`,
          ]}
        />
        <MainPhoto />
        <h1 style={{ marginTop: `2.5rem` }}>Welcome to my site!</h1>
        <p>
          My name is Viktors Telle, and I am from Latvia. I work as a software developer for more than 12 years. I am a husband and father of the two beautiful kids. I
          am a family man, and since the Covid-19 outbreak started, I work from
          home and together with my wife take care of our kids.
        </p>
        <p>
          Currently, I am entitled as a system architect in a large enterprise
          company. Before that, I worked at a variety of companies ranging from
          small startups to midsize companies. My focus is primarily on
          developing applications using .NET Core and SPA frameworks like React
          and Angular. I have experience in creating up CI/CD pipelines in
          TeamCity, Octopus Deploy, and Azure DevOps. I also have experience in
          coaching and mentoring other developers for the last five years. I am
          a big fan of clean code, best practices and quality software.
        </p>
        <p>
          I write a{" "}
          <Link style={{ color: `black` }} to="/blog">
            blog
          </Link>{" "}
          where I mostly share my work experience and try to help people to
          learn from my mistakes. It is known for a fact that the fastest and
          the best way to learn is to learn from someone else's mistakes and
          experiences. I also share the best practices in software development.
          Besides writing and spending time with my kids, I also study the
          finances and entrepreneurship by reading books and listening to
          various podcasts.
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
