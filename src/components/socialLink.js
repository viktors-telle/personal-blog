import React from "react"

const SocialLink = ({ domain, userName, name }) => (
  <a
    style={{
      color: `black`,
    }}
    href={`https://${domain}/${userName}`}
    target="_blank"
    rel="noreferrer"
  >
    {name}
  </a>
)

export default SocialLink
