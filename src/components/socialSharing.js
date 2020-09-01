import React from "react"
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share"

const SocialSharing = ({ postFrontmatter, postUrl, siteUrl }) => {
  const iconSize = 40
  return (
    <div style={{ marginBottom: `10px` }}>
      <TwitterShareButton
        title={postFrontmatter.title}
        url={postUrl}
        hashtags={postFrontmatter.keywords.map((keyword) => {
          return keyword.replace(/\s/g, "")
        })}
      >
        <TwitterIcon size={iconSize} round={true} />
      </TwitterShareButton>{" "}
      <FacebookShareButton url={postUrl} quote={postFrontmatter.description}>
        <FacebookIcon size={iconSize} round={true} />
      </FacebookShareButton>{" "}
      <LinkedinShareButton
        url={postUrl}
        title={postFrontmatter.title}
        summary={postFrontmatter.description}
        source={siteUrl}
      >
        <LinkedinIcon size={iconSize} round={true} />
      </LinkedinShareButton>
    </div>
  )
}

export default SocialSharing
