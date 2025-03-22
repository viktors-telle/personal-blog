import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({
               description = "",
               meta = [],
               keywords = [],
               title,
               canonical = "",
               lang = "en",
             }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [{ rel: "canonical", key: canonical, href: canonical }]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:locale`,
          content: lang,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        keywords.length > 0
          ? {
            name: `keywords`,
            content: keywords.join(`, `),
          }
          : {},
      ]
        .filter(Boolean)
        .concat(meta)}
    >
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      {/* additional links and tags if needed */}
    </Helmet>
  );
};

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.array,
  description: PropTypes.string,
  canonical: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
