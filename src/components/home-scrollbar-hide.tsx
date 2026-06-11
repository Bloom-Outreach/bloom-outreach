"use client";

import { useEffect } from "react";

/** Hides the vertical scrollbar on the home page only; scrolling still works. */
export function HomeScrollbarHide() {
  useEffect(() => {
    document.documentElement.classList.add("scrollbar-hide");
    document.body.classList.add("scrollbar-hide");

    return () => {
      document.documentElement.classList.remove("scrollbar-hide");
      document.body.classList.remove("scrollbar-hide");
    };
  }, []);

  return null;
}
