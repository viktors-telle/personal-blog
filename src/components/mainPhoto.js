import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const PhotoWrap = styled.div`
  display: flex;
  text-align: center;
`
const MainPhoto = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "Viktors and Emma" }, extension: { eq: "jpg" }) {
        childImageSharp {
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      #   file(name: { eq: "Viktors and Emma" }, extension: { eq: "jpg" }) {
      #     childImageSharp {
      #       fluid(maxWidth: 250, maxHeight: 250) {
      #         ...GatsbyImageSharpFluid
      #       }
      #     }
      #   }
    }
  `)

  return (
    <PhotoWrap>
      <Image
        fixed={data.file.childImageSharp.fixed}
        alt="Viktors and his daughter."
        style={{
          borderRadius: `100%`,
          display: `block`,
          margin: `0 auto 0 auto`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
    </PhotoWrap>
  )
}

export default MainPhoto
