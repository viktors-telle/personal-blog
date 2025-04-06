const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://www.viktorstelle.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === "production"
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    title: `Viktors Telle`,
    author: `Viktors Telle`,
    description: `My name is Viktors Telle and with over 16 years of industry experience, I deliver high-quality software solutions built on solid engineering principles.`,
    siteUrl,
    social: {
      twitter: `ViktorsTelle`,
      linkedIn: `viktors-telle`,
      medium: `@viktors.telle`,
      github: `viktors-telle`,
    },
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Blog",
        link: "/blog/",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-decap-cms`,
    "gatsby-plugin-image",
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              markdownCaptions: true,
              quality: 100,
              loading: "eager",
              backgroundColor: "none",
              disableBgImage: true,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-embed-gist`,
            options: {
              username: "viktors-telle",
              gistDefaultCssInclude: true,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Dark+ (default dark)",
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const url =
                  site.siteMetadata.siteUrl + "/blog" + edge.node.fields.slug
                return {
                  ...edge.node.frontmatter, title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: url,
                  guid: url,
                  custom_elements: [
                    {
                      "content:encoded": edge.node.html.replace(
                        /(?<="|\s)\/static\//g,
                        `${site.siteMetadata.siteUrl}\\/static\\/`,
                      ),
                    },
                    { tags: edge.node.frontmatter.keywords.join(", ") },
                    { "dc:creator": "Viktors Telle" },
                  ],
                }
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                      keywords
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "https://www.viktorstelle.com",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-173562871-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Viktors Telle`,
        short_name: `ViktorsTelleWeb`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0aa`,
        display: `minimal-ui`,
        icon: `content/assets/android-chrome-512x512.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        env: {
          production: {
            policy: [{ userAgent: "*", disallow: ["/admin"] }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
  ],
}
