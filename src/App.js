import React from "react";
import ContactForm from "./contactForm";
import ThemeToggle from "./components/ThemeToggle";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <ThemeToggle />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;