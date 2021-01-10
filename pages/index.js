import React from "react";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const recaptchaRef = React.useRef(null);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    alert(`Hey, ${email}`);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef.current.reset();
  };

  return (
    <div className="container">
      <Head>
        <title>Recaptcha with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="feedback-form">
        <h2 className="header">Hello reCAPTCHA</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
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
