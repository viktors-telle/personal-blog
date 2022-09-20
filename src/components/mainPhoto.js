import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const MainPhoto = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "Viktors" }, extension: { eq: "jpg" }) {
        childImageSharp {
          fluid(quality: 100, webpQuality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)

  return (
    <Image
      fluid={data.file.childImageSharp.fluid}
      fadeIn={false}
      loading="eager"
      alt="Viktors"
      style={{
        borderRadius: `100%`,
        display: `block`,
        margin: `0 auto 0 auto`,
        maxWidth: `200px`,
        maxHeight: `200px`,
      }}
      imgStyle={{
        borderRadius: `50%`,
        objectPosition: `50% 50%`,
      }}
    />
  )
}

export default MainPhoto
