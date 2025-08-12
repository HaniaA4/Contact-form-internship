import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full px-4 bg-card dark:bg-gray-900  flex flex-col items-center justify-center z-50">
      <p className="text-sm text-muted-foreground mt-2 dark:text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Hania. All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors mt-2"
      >
        {/* Add icon or text here if needed */}
      </a>
    </footer>
  );
};