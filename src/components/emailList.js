import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { useToasts } from "react-toast-notifications"

const EmailList = () => {
  const { addToast } = useToasts()
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await addToMailchimp(email)

    if (response.result === "error") {
      if (response.msg.includes("is already subscribed")) {
        addToast("You are already subscribed!", { appearance: "warning" })
      } else {
        addToast(response.msg, { appearance: "error" })
      }
    } else {
      addToast(response.msg, { appearance: "success" })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: `rgb(211, 211, 211, 0.1)`,
        padding: `10px`,
        border: `0.1rem solid #d1d1d1`,
      }}
    >
      <h3>Subscribe to my email list</h3>
      <label>
        Email
        <input
          name="email"
          type="email"
          class="input-teal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button class="button-teal" type="submit">
        Subscribe
      </button>
    </form>
  )
}

export default EmailList
