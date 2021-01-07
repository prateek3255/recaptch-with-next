import React from "react";
import Head from "next/head";

export default function Home() {
  const [email, setEmail] = React.useState("");

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Hey, ${email}`);
  }

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
            <input onChange={handleChange} required type="email" name="email" placeholder="Email" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
