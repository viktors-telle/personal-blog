import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const MAILCHIMP_URL = process.env.GATSBY_MAILCHIMP_URL

const EmailList = () => {
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
        toast.success("Subscription successful! Please check your inbox.")
        setEmail("")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.")
      console.error("Mailchimp Error:", error)
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
    </>
  )
}

export default EmailList
