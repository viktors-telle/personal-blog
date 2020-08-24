import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" />
      <h1>Contact Me</h1>
      <form
        class="email-form"
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/thank-you"
      >
        <input class="input-teal" type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name <input class="input-teal" type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email <input class="input-teal" type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message <textarea class="input-teal" name="message"></textarea>
          </label>
        </p>
        <p>
          <button class="button-teal" type="submit">
            Send
          </button>
        </p>
      </form>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`