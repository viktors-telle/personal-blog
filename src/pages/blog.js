import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { CommentCount } from "disqus-react"
import EmailList from "../components/emailList"

const Blog = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const disqusConfig = ({ slug, title }) => ({
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      identifier: slug,
      title: title,
    },
  });

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" />
      <EmailList />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: `none` }}
                  to={`/blog${node.fields.slug}`}
                >
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date} </small>
              <small>&bull; {node.timeToRead} min read </small>
              <small>
                &bull;{" "}
                <Link to={`/blog${node.fields.slug}#disqus_thread`}>
                  <CommentCount
                    {...disqusConfig({
                      slug: node.fields.slug,
                      title: node.frontmatter.title,
                    })}
                  ></CommentCount>
                </Link>
              </small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
