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
          `Senior Backend Engineer`,
          `.NET contractor`,
          `B2B software development`,
          `C#`,
          `.NET`,
          `ASP.NET Core`,
          `SQL Server`,
          `Azure`,
          `Data pipelines`,
          `System architecture`,
          `CI/CD`,
          `Kubernetes`,
        ]}
      />
      <MainPhoto />
      <h1 style={{ marginTop: `2.5rem` }}>Senior Backend Engineer & System Architect</h1>
      <h3>Hi, I'm Viktors</h3>
      <p>
        I build high-performance, data-intensive backend systems in C#, .NET, and ASP.NET Core. With 17+ years of experience, I currently work with financial sector clients through my company SIA TelleNet Solutions, delivering backend engineering and architecture consultancy. If you need a senior engineer who ships reliable systems without the overhead of a full-time hire - let's talk.
      </p>
      <h3>What I deliver</h3>
      <p>
        My work is centered around ASP.NET Core, Entity Framework Core, SQL Server, and cloud-native infrastructure (Azure, Kubernetes, CI/CD). I have deep experience with large-scale data migrations, high-throughput ETL pipelines, and complex SQL - designing schemas, optimizing queries, and moving tens of millions of records with strong guarantees around data integrity. On a recent project, I led the migration of ~120M financial records across multiple interconnected systems with zero data loss, and cut batch processing time from ~8 hours to under 90 minutes through bulk operations, query rewrites, and index optimization.
      </p>
      <h3>Architecture & technical leadership</h3>
      <p>
        I spent nearly four years as a System Architect at If Insurance, where I designed the architecture for a Baltic-wide claims processing system and led the migration from ARM templates to Terraform across all Baltic teams. I care a lot about observability and reliability - structured logging, custom metrics, dashboards, and resilient patterns (retries, idempotency, bulk/batch processing) to keep systems stable in production. If your team needs someone who can own architecture decisions and raise the bar on code quality and review practices, that's where I thrive.
      </p>
      <h3>Beyond code</h3>
      <p>
        When I'm not shipping features or spending time with my family, I'm usually learning - exploring finance and entrepreneurship and applying those lessons to how I build and run software projects.
      </p>
      <h3>Products I've built</h3>
      <p>
        I love turning ideas into working products. I built{" "}<Link to="https://adsnap.lv/en" target="_blank">AdSnap</Link>, a classifieds aggregator platform with multi-source data ingestion, search, and filtering, and{" "}<Link to="https://iscompliant.app/" target="_blank">Listing Compliance Shield</Link>, a tool that automatically checks Etsy listings against platform policies and flags violations before they cause issues.
      </p>
      <h3>On the blog</h3>
      <p>
        I share hard-won lessons from real projects - the wins, the mistakes, and what I'd do differently next time. If it helps another developer dodge a pitfall or save a few hours, that's a win.
      </p>
      <h3>Available for contract work</h3>
      <p>
        Looking for a senior backend engineer or system architect for your next project? I work on a B2B contract basis through SIA TelleNet Solutions and am currently open for new engagements. Reach out through the <Link to="/contact/">contact form</Link> - let's discuss how I can help.
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
