import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

const MainPhoto = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "Profile1" }, extension: { eq: "jpeg" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
            aspectRatio: 1
            formats: [AUTO, WEBP, AVIF]
            layout: FIXED
            quality: 100
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
    }
  `);

  const image = getImage(data.file);

  return (
    <GatsbyImage
      image={image}
      alt="Viktors"
      loading="eager"
      style={{
        borderRadius: "100%",
        display: "block",
        margin: "0 auto",
        maxWidth: "200px",
        maxHeight: "200px",
      }}
      imgStyle={{
        borderRadius: "50%",
        objectPosition: "50% 50%",
      }}
    />
  );
};

export default MainPhoto;
