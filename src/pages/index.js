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
      <h3>Hi, I'm Viktors</h3>
      <p>
        I build software that actually solves problems. For 16+ years I've been shipping reliable, maintainable systems - and I still get a kick out of turning messy requirements into clean, working solutions. I run a small dev company in Latvia and partner with businesses that want long-term, no-drama results.
      </p>
      <h3>What I'm good at</h3>
      <p>
        I work mostly with .NET/.NET Core and care a lot about clean architecture, testing, and pragmatism. I've set up plenty of CI/CD pipelines with TeamCity, Octopus Deploy, and Azure DevOps, and I like keeping delivery fast and predictable without over-engineering.
      </p>
      <h3>Leading & leveling up teams</h3>
      <p>
        Over the last five years I've coached and mentored developers, helping teams raise the bar on code quality, reviews, and delivery practices. I aim for sustainable processes: move quickly, keep things tidy, and make tomorrow's work easier - not harder.
      </p>
      <h3>Beyond code</h3>
      <p>
        When I'm not shipping features or hanging out with my family, I'm usually learning - diving into finance and entrepreneurship and applying those lessons to how I build and run software projects.
      </p>
      <h3>Products & startups</h3>
      <p>
        I love building new products and startups that tackle real-life pain points. Recently I launched <Link to="https://adsnap.lv/" target="_blank">{" "}AdSnap</Link>, an ads listing platform - a hands-on example of how I blend product thinking with solid engineering.
      </p>
      <h3>On the blog</h3>
      <p>
        I share the wins, the facepalms, and the “here's what I'd do differently next time.” If my lessons help another dev dodge a pitfall or save a few hours, that's a win - learning from each other is the fastest way to grow.
      </p>
      <h3>Let's talk</h3>
      <p>
        Curious about improving legacy code, tightening up CI/CD, or getting a new product off the ground? Drop me a note through the <Link to="/contact/">contact form</Link> - I'm happy to help.
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
