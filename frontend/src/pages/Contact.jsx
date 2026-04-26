import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", form);

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }

    setLoading(false);
  };

  return (
    <main className="page-shell">
      <section className="contact-page">
        <div className="contact-container">
        <div className="contact-form">
          <p className="eyebrow">Contact Us</p>
          <h1>Join Us in Creating Something Great</h1>

          {success && <p className="success-msg">Message sent successfully!</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject *"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Message *"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Address</h3>
          <p>Beirut, Lebanon</p>

          <h3>Contact</h3>
          <p>Phone: +961 00 000 000</p>
          <p>Email: example@gmail.com</p>

          <h3>Open Time</h3>
          <p>Monday - Friday: 10:00 - 20:00</p>
        </div>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26496.135290220027!2d35.5042823!3d33.889218299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut!5e0!3m2!1sen!2slb!4v1776808948346!5m2!1sen!2slb"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Massoud Center location map"
          />
        </div>
      </section>
    </main>
  );
}
