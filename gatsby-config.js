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
    description: `My name is Viktors Telle, and I am a software developer from Latvia. I work in the industry for more than 12 years. I am a husband and father of the two beautiful kids. I am a family man, and since the Covid-19 outbreak started, I work from home, and together with my wife, take care of our kids.`,
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
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              showCaptions: true,
              markdownCaptions: true,
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
        siteUrl: `https://viktorstelle.com`,
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
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: url,
                  guid: url,
                  custom_elements: [
                    {
                      "content:encoded": edge.node.html.replace(
                        /(?<=\"|\s)\/static\//g,
                        `${site.siteMetadata.siteUrl}\/static\/`
                      ),
                    },
                    { tags: edge.node.frontmatter.keywords.join(", ") },
                    { "dc:creator": "Viktors Telle" },
                  ],
                })
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
        resolveEnv: () => NETLIFY_ENV,
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
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://viktorstelle.us17.list-manage.com/subscribe/post?u=3cbc846dbc5d9cc54a2d286db&amp;id=699e61a498",
        timeout: 3500,
      },
    },
  ],
}
