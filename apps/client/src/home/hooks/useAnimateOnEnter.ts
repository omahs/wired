import { useEffect } from "react";

export function useAnimateOnEnter() {
  useEffect(() => {
    // Set up a new observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement) {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeInSlow");
          } else if (window.scrollY < entry.target.offsetTop) {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeInSlow");
          }
        }
      });
    });

    // Get all the elements you want to show on scroll
    const targets = document.querySelectorAll(".show-on-scroll");

    // Loop through each of the target
    targets.forEach(function (target) {
      // Hide the element
      target.classList.add("opacity-0");

      // Add the element to the watcher
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
