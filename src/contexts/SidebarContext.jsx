import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Start with false, then restore from storage

  // Restore sidebar state from localStorage + handle responsive behavior
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    const isDesktop = window.innerWidth >= 1024;

    let initialState;

    if (savedState !== null) {
      // User has previously set preference
      initialState = savedState === "true";
    } else {
      // First time: Open on desktop, closed on mobile
      initialState = isDesktop;
    }

    setIsOpen(initialState);
  }, []);

  // Handle window resize (responsive behavior)
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        // On desktop, keep it open unless user manually closed it
        const saved = localStorage.getItem("sidebarOpen");
        if (saved === null) {
          setIsOpen(true);
        }
      } else {
        // On mobile → always treat as drawer (closed by default)
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarOpen", newState);
      return newState;
    });
  };

  const close = () => {
    setIsOpen(false);
    localStorage.setItem("sidebarOpen", "false");
  };

  const open = () => {
    setIsOpen(true);
    localStorage.setItem("sidebarOpen", "true");
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};
