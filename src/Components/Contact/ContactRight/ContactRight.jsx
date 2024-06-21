import { contact } from "../../../Assets";
import "./styles.css";
import React, { useState, useRef } from "react";

export const ContactRight = () => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    number: "",
    query: "",
  });
  const [rows, setRows] = useState(1);
  const [formStatus, setFormStatus] = useState("");
  const formRef = useRef(null);
  const iframeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "query") {
      let matches = value.match(new RegExp("\n", "gi"));
      setRows(matches ? matches.length + 1 : 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");

    formRef.current.submit();
    iframeRef.current.onload = () => {
      setFormStatus("Query submitted successfully!");
      setFormData({
        company: "",
        name: "",
        email: "",
        number: "",
        query: "",
      });
      setRows(1);
    };
  };

  return (
    <form
      ref={formRef}
      className="contact-right"
      action="https://script.google.com/macros/s/AKfycbzozV9L9IHoN3Zdvhc_EJg3bCIqOSB2ZeuTtnaq57aYbiDt-Avl61UGuNhe4iF4psjL/exec"
      method="post"
      target="hidden_iframe"
      onSubmit={handleSubmit}
    >
      <div className="contact-right-container">
        <div className="contact-right-design">
          <div className="contact-right-ring"></div>
          <div className="contact-right-ring"></div>
        </div>
        <div className="right-contact-container">
          <div className="right-contact-details">
            {["company", "name"].map((field) => (
              <div key={field} className="right-contact-detail">
                <input
                  type="text"
                  className="forminputs"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                <label className="input-label" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
          </div>
          <div className="right-contact-details">
            {["email", "number"].map((field) => (
              <div key={field} className="right-contact-detail">
                <input
                  type={field === "email" ? "email" : "tel"}
                  className="forminputs"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                <label className="input-label" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
          </div>
          <div className="right-contact-details">
            <div className="right-contact-detail">
              <textarea
                name="query"
                id="query"
                className="formTextArea"
                value={formData.query}
                onChange={handleChange}
                placeholder="Write your inquiry..."
                rows={rows}
                required
              />
            </div>
          </div>
        </div>
        <div className="right-contact-footer">
          <div className="right-footer">
            <button type="submit" className="button footerbutton">
              Submit Query
            </button>
          </div>
          <div className="right-image">
            <img src={contact} alt="arrows" />
          </div>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        name="hidden_iframe"
        style={{ display: "none" }}
      ></iframe>
    </form>
  );
};