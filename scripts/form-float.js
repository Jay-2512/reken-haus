// Add GSAP fade-in animation for form inputs
const initFormAnimations = () => {
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error(
      "GSAP or ScrollTrigger not found. Make sure to include both libraries."
    );
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select all form inputs
  const formInputs = document.querySelectorAll(".form-input");
  const submitButton = document.querySelector(".submit-btn");

  // Set initial state - fully transparent
  gsap.set([formInputs, submitButton], { opacity: 0, y: 20 });

  // Create the fade-in animation for inputs with staggered effect
  gsap.to(formInputs, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15, // Each input animates with a slight delay
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".form-container",
      start: "top 80%", // Animation starts when form is 80% into view
      end: "bottom 20%", // End point for scrub option
      toggleActions: "play reverse play reverse", // Makes animation reversible
    },
  });

  // Animate submit button after the inputs
  gsap.to(submitButton, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.4, // Slight delay after inputs
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".form-container",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse", // Makes animation reversible
    },
  });
};

// Initialize the form animations when the DOM is loaded
document.addEventListener("DOMContentLoaded", initFormAnimations);
