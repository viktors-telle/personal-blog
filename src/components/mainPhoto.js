import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const MainPhoto = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "Viktors and Emma" }, extension: { eq: "jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
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
      alt="Viktors and his daughter."
      style={{
        borderRadius: `100%`,
        display: `block`,
        margin: `0 auto 0 auto`,
        maxWidth: `200px`,
        maxHeight: `200px`,
      }}
      imgStyle={{
        borderRadius: `50%`,
        objectPosition: `top`,
      }}
    />
  )
}

export default MainPhoto
