import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from "gatsby"

const LogoWrap = styled.div`
    margin: auto 0;
    flex: 0 1 50px;
    box-shadow: none;

    @media (max-width: 768px) and (orientation: landscape) {
        flex: 0 1 25px;
    }
`
const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "android-chrome-192x192" }, extension: { eq: "png" }) {
        childImageSharp {
          gatsbyImageData(width: 50, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const image = getImage(data.file);

  return (
    <LogoWrap as={Link} to="/">
      <GatsbyImage image={image} alt="Logo" loading="eager" />
    </LogoWrap>
  )
}

export default Logo
