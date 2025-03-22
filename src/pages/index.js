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
      <h3>Expert Software Development & Technical Leadership</h3>
      <p>
        With over 16 years of industry experience, I deliver high-quality software solutions built on solid engineering principles. As the founder of my own software development company based in Latvia, I partner with businesses to create robust, maintainable applications that solve real problems.
      </p>
      <h3>Technical Expertise</h3>
      <p>
        My core competency lies in .NET Core development, complemented by extensive experience implementing CI/CD pipelines using TeamCity, Octopus Deploy, and Azure DevOps. I'm committed to clean code architecture, industry best practices, and quality-driven development methodologies.
      </p>
      <h3>Leadership & Mentorship</h3>
      <p>
        For the past five years, I've coached and mentored developers, helping teams level up their technical capabilities and engineering practices. I believe in sustainable development processes that balance innovation with maintainability.
      </p>
      <h3>Beyond Coding</h3>
      <p>
        When I'm not building software or spending time with my family, I invest in continuous learning through finance and entrepreneurship studies. This multidisciplinary approach informs my technical work and business decisions.
        I recently launched <Link to="https://adsnap.eu/" target="_blank">{" "}AdSnap</Link>, an ads listing platform that showcases my practical approach to business and technology.
      </p>
      <h3>My Blog</h3>
      <p>
        Through my <Link to="/blog/">blog</Link>, I share insights from my professional journey - both successes and failures - to help other developers avoid common pitfalls. I firmly believe that learning from others' experiences accelerates professional growth.
      </p>
      <h3>Let's Connect</h3>
      <p>
        Have questions about development best practices, legacy code improvement, CI/CD automation, or other software engineering challenges? Reach out through my <Link to="/contact/">contact form</Link> for a consultation.
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
