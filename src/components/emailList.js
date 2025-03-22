import React, { useState } from "react"
import { useToasts } from "react-toast-notifications"

const MAILCHIMP_URL =
  "https://viktorstelle.us17.list-manage.com/subscribe/post?u=3cbc846dbc5d9cc54a2d286db&amp;id=699e61a498"

const EmailList = () => {
  const { addToast } = useToasts()
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}`

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "no-cors",
      })

      if (response.ok || response.type === "opaque") {
        addToast("Subscription successful! Please check your inbox.", {
          appearance: "success",
        })
        setEmail("")
      } else {
        addToast("Something went wrong. Please try again.", { appearance: "error" })
      }
    } catch (error) {
      addToast("An error occurred. Please try again later.", { appearance: "error" })
      console.error("Mailchimp Error:", error)
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
          className="input-teal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button className="button-teal" type="submit">
        Subscribe
      </button>
    </form>
  )
}

export default EmailList
