import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MainPhoto from "../components/mainPhoto"

const IndexPage = (props) => {
  const siteTitle = "My website"

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[
          `Viktors Telle`,
          `Personal blog`,
          `Personal website`,
          `Software development`,
          `C#`,
          `.NET`,
          `DevOps`,
          `React`,
          `Clean code`,
        ]}
      />
      <MainPhoto />
      <h1 style={{ marginTop: `2.5rem` }}>Welcome to my site!</h1>
      <p>
        My name is Viktors Telle, and I am a software developer from Latvia.
        I've been working in the industry for more than 12 years. I am a husband
        and father of the two beautiful kids. I am a family man, and since the
        Covid-19 outbreak started, I work from home, and together with my wife,
        take care of our kids.
      </p>
      <p>
        Currently, I am entitled as a system architect in a large enterprise
        company. Before that, I worked at a variety of companies ranging from
        small startups to midsize companies. My focus is primarily on developing
        applications using .NET Core and SPA frameworks like React and Angular.
        I have experience in creating up CI/CD pipelines in TeamCity, Octopus
        Deploy, and Azure DevOps. I also have experience in coaching and
        mentoring other developers for the last five years. I am a big fan of
        clean code, best practices, and quality software.
      </p>
      <p>
        I write a <Link to="/blog/">blog</Link> where I share my work experience
        and try to help people to learn from my mistakes. It is known for a fact
        that the fastest and the best way to learn is to learn from someone
        else's mistakes and experiences. I also share the best practices in
        software development. Besides writing and spending time with my kids, I
        also study the finances and entrepreneurship by reading books and
        listening to various podcasts.
      </p>
      <p>
        If you want to reach me, please send me a message via
        <Link to="/contact/"> contact form.</Link>I can advise on the
        development best practices, how to improve legacy code base, how to
        automate your build and deployment pipeline, or other software
        development topics.
      </p>
    </Layout>
  )
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
