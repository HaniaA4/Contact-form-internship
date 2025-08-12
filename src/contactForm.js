import React, { useState, useEffect } from "react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [borderGradient, setBorderGradient] = useState(
    "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box"
  );
  const [buttonGradient, setButtonGradient] = useState(
    "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box"
  );

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
      setTimeout(() => setStatus(""), 5000);
    }, 1000);
  };

  const borderStyle = {
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box",
    border: "3px solid transparent",
    borderRadius: "18px",
    animation: "borderMove 3s linear infinite",
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
  };

  useEffect(() => {
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

  useEffect(() => {
    const updateGradient = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setBorderGradient(
        isDark
          ? "linear-gradient(#111827, #111827) padding-box, linear-gradient(90deg, rgba(37,99,235,0.3), rgba(162,28,175,0.3), rgba(37,99,235,0.3)) border-box"
          : "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box"
      );
      setButtonGradient(
        isDark
          ? "linear-gradient(#111827, #111827) padding-box, linear-gradient(90deg, rgba(37,99,235,0.3), rgba(162,28,175,0.3), rgba(37,99,235,0.3)) border-box"
          : "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2563eb, #a21caf, #2563eb) border-box"
      );
    };

    updateGradient();

    // Listen for class changes on <html>
    const observer = new MutationObserver(updateGradient); 
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    /*
    whenever the class attribute on <html> changes,
    when switching between dark and light mode,
    updateGradient function runs and updates the gradients to match the current theme.
    */
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-4 sm:py-10 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
        <div className="mb-4 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-blue-800 dark:text-purple-400">
            Let's Connect
          </h2>
          <p className="text-gray-900 dark:text-gray-300 font-serif text-sm sm:text-base">
            Interested in working together or tasting more? Send a message and let’s get started.
          </p>
        </div>
        <div
          className="p-[3px] rounded-[18px] animate-[borderMove_3s_linear_infinite]"
          style={{
            background: borderGradient,
            border: "3px solid transparent",
            borderRadius: "18px",
            animation: "borderMove 3s linear infinite",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
          }}
        >
          <form
            className="flex flex-col gap-3 sm:gap-5 shadow-xl dark:shadow-md p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-[15px] transition-colors duration-300"
            onSubmit={handleSubmit}
            noValidate
          >
            {["name", "email", "subject", "message"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block font-medium mb-1 text-sm text-gray-900 dark:text-gray-300"
                >
                  {field === "name"
                    ? "Your Name"
                    : field === "email"
                    ? "Your Email"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    placeholder={
                      field === "name"
                        ? "Full Name"
                        : field === "email"
                        ? "dev@email.com"
                        : "Brief description..."
                    }
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm transition-colors duration-300"
                  />
                ) : (
                  <textarea
                    id="message"
                    name="message"
                    rows="2"
                    placeholder="Say hello..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm transition-colors duration-300"
                  />
                )}
                <span className="text-red-600 dark:text-red-400 text-xs">{errors[field]}</span>
              </div>
            ))}
            <button
              type="submit"
              className="w-36 sm:w-44 mx-auto py-2 sm:py-3 text-base sm:text-lg font-semibold text-blue-800 dark:text-white rounded-lg shadow-md transition-all outline-none tracking-wide relative z-10 bg-white dark:bg-gray-800 hover:scale-105"
              style={{
                background: buttonGradient,
                border: "3px solid transparent",
                borderRadius: "12px",
                animation: "borderMove 3s linear infinite",
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 50%",
              }}
            >
              Send Message
            </button>
            <p className="text-center text-green-600 dark:text-green-400 mt-1 text-sm">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
