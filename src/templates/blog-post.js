import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { DiscussionEmbed, CommentCount } from "disqus-react"
import styled from "styled-components"
import ScrollToTopButton from "../components/scrollToTopButton"
import EmailList from "../components/emailList"

const PostNavigation = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin-left: 0px;

  li {
    max-width: 300px;
    margin-left: 0px;
    :nth-child(2) {
      text-align: right;
    }
  }
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const disqusConfig = ({ slug, title }) => ({
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      identifier: slug,
      title: title,
    },
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        canonical={post.frontmatter.canonical}
        keywords={post.frontmatter.keywords}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(0.4),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(0.5),
            }}
          >
            {post.frontmatter.date} &bull; {post.timeToRead} min read &bull;{" "}
            <Link to={`#disqus_thread`}>
              <CommentCount
                {...disqusConfig({
                  slug: post.frontmatter.title,
                  title: siteTitle,
                })}
              />
            </Link>
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <p>
          <EmailList />
        </p>
        <p>
          {post.frontmatter.keywords.map((tag, i) => [
            <strong
              key={i}
              style={{
                margin: `4px`,
                padding: `4px`,
                background: `#D3D3D3`,
                lineHeight: `2.5`,
              }}
            >
              {" "}
              #{tag.replace(/ /g, "")}
            </strong>,
          ])}
        </p>
      </article>
      <ScrollToTopButton />
      <nav>
        <PostNavigation>
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </PostNavigation>
      </nav>
      <DiscussionEmbed
        {...disqusConfig({
          slug: post.frontmatter.title,
          title: siteTitle,
        })}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        canonical
        keywords
      }
    }
  }
`
