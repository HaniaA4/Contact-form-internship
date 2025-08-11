import React, { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent!");
      setForm({ name: "", email: "", subject: "", message: "" });
      // Hide the status after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    }, 1000);
  };

  // Animated gradient border style
  const borderStyle = {
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box",
    border: "3px solid transparent",
    borderRadius: "18px",
    animation: "borderMove 3s linear infinite",
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
  };

  // Add keyframes for border animation
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes borderMove {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="py-4 sm:py-10 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto p-0 px-4 sm:px-0">
        <div className="mb-4 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-blue-800">
            Let's Connect
          </h2>
          <p className="text-gray-900 font-serif text-sm sm:text-base">
            Interested in working together or learning more? Send a message
            and let’s get started.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 sm:gap-5 shadow-xl p-4 sm:p-8"
          style={borderStyle}
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-sm"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <span className="text-red-600 text-xs">{errors.name}</span>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1 text-sm"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="dev@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <span className="text-red-600 text-xs">{errors.email}</span>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block font-medium mb-1 text-sm"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Brief description..."
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <span className="text-red-600 text-xs">{errors.subject}</span>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-medium mb-1 text-sm"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="2"
              placeholder="Say hello..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <span className="text-red-600 text-xs">{errors.message}</span>
          </div>
          <button
            type="submit"
            className="w-36 sm:w-44 mx-auto py-2 sm:py-3 text-base sm:text-lg font-semibold text-blue-800 rounded-lg shadow-md transition-all outline-none tracking-wide relative z-10 bg-white hover:scale-105"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box",
              border: "3px solid transparent",
              borderRadius: "12px",
              animation: "borderMove 3s linear infinite",
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 50%",
            }}
          >
            Send Message
          </button>
          <p className="text-center text-green-600 mt-1 text-sm">{status}</p>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;