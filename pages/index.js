import React from "react";
import Head from "next/head";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const hcaptchaRef = React.useRef(null);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Execute the hCaptcha when the form is submitted
    hcaptchaRef.current.execute();
  };

  const onHCaptchaChange = async (captchaCode) => {
    // If the hCaptcha code is null or undefined indicating that
    // the hCaptcha was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        alert("Email registered successfully");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message)
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the hCaptcha when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      setEmail("");
    }
  };

  return (
    <div className="container">
      <Head>
        <title>hCaptcha with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="feedback-form">
        <h2 className="header">Hello hCaptcha</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <HCaptcha
              id="test"
              size="invisible"
              ref={hcaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onVerify={onHCaptchaChange}
            />
            <input
              onChange={handleChange}
              required
              type="email"
              name="email"
              placeholder="Email"
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
