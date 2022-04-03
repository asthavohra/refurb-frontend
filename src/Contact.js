import React from "react";
import "./Contact.css";
import Footer from "./Footer";
function Contact() {
  return (
    <>
      <div className="contact">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSepNmd827DWI3YgRnO5sfFr0ICVfwAi8HT8X2RLlp-8fhFG8g/viewform?embedded=true"
          width="640"
          height="864"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
