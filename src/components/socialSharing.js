import React from "react"
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share"

const SocialSharing = ({ postFrontmatter, postUrl, siteUrl }) => (
  <div style={{ display: `table` }}>
    Share
    <span style={{ verticalAlign: `middle`, display: `table-cell` }}>
      <TwitterShareButton
        title={postFrontmatter.title}
        url={postUrl}
        hashtags={postFrontmatter.keywords.map((keyword) => {
          return keyword.replace(/\s/g, "")
        })}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>{" "}
      <FacebookShareButton url={postUrl} quote={postFrontmatter.description}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>{" "}
      <LinkedinShareButton
        url={postUrl}
        title={postFrontmatter.title}
        summary={postFrontmatter.description}
        source={siteUrl}
      >
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
    </span>
  </div>
)

export default SocialSharing
