module.exports = {
  siteMetadata: {
    // edit below
    title: `Viktors Telle blog`,
    author: `Viktors Telle`,
    description: `Viktors Telle personal website and blog. Viktors is system architect and full-stack developer with 12+ years of experience. My focus is primarily on developing applications using .NET Core and SPA frameworks like React and Angular. I am also experienced in setting up CI/CD pipelines in TeamCity, Octopus Deploy, and Azure
    DevOps.`,
    siteUrl: `https://viktorstelle.com/`,
    social: {
      twitter: `ViktorsTelle`,
      linkedIn: `viktors-telle`,
      medium: `viktors.telle`,
      github: `viktors-telle`,
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
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
              theme: "Abyss",
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
    `gatsby-plugin-feed-mdx`,
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
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     extensions: [".mdx", ".md"],
    //     gatsbyRemarkPlugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 590,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-responsive-iframe`,
    //         options: {
    //           wrapperStyle: `margin-bottom: 1.0725rem`,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-vscode`,
    //         options: {
    //           theme: "Abyss",
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-copy-linked-files`,
    //       },
    //       {
    //         resolve: `gatsby-remark-smartypants`,
    //       },
    //     ],
    //     plugins: [`gatsby-remark-images`],
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // edit below
        trackingId: `UA-173562871-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // edit below
        icon: `content/assets/viktors-telle-512x512.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
