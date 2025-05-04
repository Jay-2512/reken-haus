document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Check if we're on desktop (width > 600px)
  const isDesktop = () => window.innerWidth > 600;

  // Store references to animation timelines
  let heroTimeline;
  let svgAboutTimeline;
  let svgTestimonialsTimeline;
  let scrollTriggerInstances = [];

  // Function to create desktop animations
  function setupDesktopAnimations() {
    // Only create ScrollTrigger animations if we're on desktop
    if (!isDesktop()) return;

    // Hero section animation
    heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    // Keep track of ScrollTrigger instances
    scrollTriggerInstances.push(heroTimeline.scrollTrigger);

    // Animate the logos to move to the center
    heroTimeline.to(".logo-container", {
      width: "400px",
      height: "270px",
      duration: 1,
    });

    // PREPARE nav and hero-links
    heroTimeline.set(".reken-nav-container", { display: "flex", opacity: 0 });
    heroTimeline.set(".hero-links-container", {
      display: "flex",
      opacity: 0,
      height: 0,
    });

    // NOW fade-in nav and grow+fade hero-links TOGETHER
    heroTimeline.to(".reken-nav-container", { opacity: 1, duration: 1 }, "<"); // Fade in nav
    heroTimeline.to(
      ".hero-links-container",
      { height: "40px", duration: 1, ease: "power2.out" },
      "<"
    ); // Grow hero-links
    heroTimeline.to(".hero-links-container", { opacity: 1, duration: 0.5 }); // Fade in hero-links

    // Hide nav smoothly
    heroTimeline.to(".reken-nav-container", { opacity: 0, duration: 1 });
    heroTimeline.set(".reken-nav-container", { display: "none" });

    // About section SVG animation
    const path = document.querySelector("#svgPath");
    if (path) {
      // Use try-catch to handle potential SVG path issues
      let length;
      try {
        length = path.getTotalLength();
      } catch (err) {
        console.warn("Error getting path length for #svgPath:", err);
        length = 1000; // Fallback default length
      }

      // Clear any previous inline styles
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      svgAboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top top",
          end: "bottom+=600% top",
          scrub: true,
          pin: true,
          onEnter: () => {
            // Hide the navbar when SVG animation starts
            gsap.to(".reken-nav-container", {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                document.querySelector(".reken-nav-container").style.display =
                  "none";
              },
            });
          },
        },
      });

      // Keep track of ScrollTrigger instances
      scrollTriggerInstances.push(svgAboutTimeline.scrollTrigger);

      svgAboutTimeline.fromTo(
        path,
        { strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 4 }
      );

      svgAboutTimeline.fromTo(
        ".about-content-1",
        { opacity: 0 },
        { opacity: 1, duration: 2 }
      );
      svgAboutTimeline.fromTo(
        ".about-content-2",
        { opacity: 0 },
        { opacity: 1, duration: 2 }
      );
    }

    // Testimonials section SVG animation
    const path2 = document.querySelector("#svgPath2");
    if (path2) {
      // Use try-catch to handle potential SVG path issues
      let length2;
      try {
        length2 = path.getTotalLength();
      } catch (err) {
        console.warn("Error getting path length for #svgPath2:", err);
        length2 = 1000; // Fallback default length
      }

      // Get testimonial cards and count
      const testimonialCards = gsap.utils.toArray(".testi-card");

      // Card animation ranges
      const cardScrollRanges = [
        [0.08, 0.14], // First card
        [0.16, 0.2], // Second card
        [0.26, 0.31], // Third card
        [0.85, 0.95], // Fourth card
      ];

      // Clear any previous inline styles
      path2.style.strokeDasharray = length2;
      path2.style.strokeDashoffset = length2;

      svgTestimonialsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top top",
          end: "bottom+=800% top", // extend the scroll distance
          scrub: true,
          pin: true,
          onEnter: () => {
            gsap.to(".reken-nav-container", {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                document.querySelector(".reken-nav-container").style.display =
                  "none";
              },
            });
          },
          onUpdate: (self) => {
            const scrollProgress = self.progress;

            testimonialCards.forEach((card, index) => {
              if (index < cardScrollRanges.length) {
                const [rangeStart, rangeEnd] = cardScrollRanges[index];
                if (
                  scrollProgress >= rangeStart &&
                  scrollProgress <= rangeEnd
                ) {
                  card.classList.add("active");
                } else {
                  card.classList.remove("active");
                }
              }
            });
          },
        },
      });

      // Keep track of ScrollTrigger instances
      scrollTriggerInstances.push(svgTestimonialsTimeline.scrollTrigger);

      svgTestimonialsTimeline.fromTo(
        path2,
        { strokeDashoffset: length2 },
        { strokeDashoffset: 0 }
      );
    }
  }

  // Function to disable all scroll triggers
  function disableScrollTriggers() {
    // Kill only ScrollTrigger instances
    scrollTriggerInstances.forEach((st) => {
      if (st) st.kill();
    });

    // Empty the array
    scrollTriggerInstances = [];

    // Cleanup any pinned elements
    document.querySelectorAll(".gsap-pin-spacer").forEach((el) => {
      const parent = el.parentNode;
      const child = el.querySelector(":scope > *:not(script)");
      if (child && parent) {
        parent.insertBefore(child, el);
        parent.removeChild(el);
      }
    });

    // Reset styles that might have been applied by GSAP
    gsap.set([".hero-section", ".about-section", ".testimonials-section"], {
      clearProps: "all",
    });

    gsap.set(
      [".logo-container", ".reken-nav-container", ".hero-links-container"],
      {
        clearProps: "all",
      }
    );

    // Make sure navigation is visible on mobile
    const nav = document.querySelector(".reken-nav-container");
    if (nav) {
      nav.style.display = "flex";
      nav.style.opacity = 1;
    }

    // Reset SVG paths if they exist
    const paths = document.querySelectorAll("#svgPath, #svgPath2");
    paths.forEach((path) => {
      if (path) {
        gsap.set(path, { clearProps: "all" });
      }
    });
  }

  // Set up animations based on initial screen size
  if (isDesktop()) {
    setupDesktopAnimations();
  }

  // Handle resize events to disable/enable animations based on screen width
  let previousWidth = window.innerWidth;
  let isCurrentlyDesktop = isDesktop();

  window.addEventListener("resize", () => {
    // Only trigger a reset if we cross the mobile/desktop threshold
    if (
      (isDesktop() && !isCurrentlyDesktop) ||
      (!isDesktop() && isCurrentlyDesktop)
    ) {
      // If switching to mobile
      if (!isDesktop()) {
        disableScrollTriggers();
      }
      // If switching to desktop
      else {
        setupDesktopAnimations();
      }

      // Update state
      isCurrentlyDesktop = isDesktop();
    }

    previousWidth = window.innerWidth;
  });

  // Video hover functionality - keep this for both mobile and desktop
  const videos = document.querySelectorAll("#hover-video");
  let userInteracted = false;

  const enableInteraction = () => {
    userInteracted = true;
    console.log("User interaction detected, unmuting allowed.");
    document.removeEventListener("click", enableInteraction);
    document.removeEventListener("keydown", enableInteraction);
  };

  document.addEventListener("click", enableInteraction);
  document.addEventListener("keydown", enableInteraction);

  videos.forEach((video) => {
    video.addEventListener("mouseenter", () => {
      if (userInteracted) {
        video.muted = false;
        video
          .play()
          .then(() => console.log("Video unmuted and playing on hover"))
          .catch((error) => console.error("Error playing video:", error));
      } else {
        console.warn("Cannot unmute video: User interaction required.");
      }
    });

    video.addEventListener("mouseleave", () => {
      video.muted = true;
    });
  });

  // Service section card carousel - keep this for both mobile and desktop
  const cards = document.querySelectorAll(".card");
  const serviceTitle = document.querySelector(".service-title");
  let current = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "left", "right");

      if (index === current) {
        card.classList.add("active");

        // Get the service title text from the card
        const titleElement = card.querySelector("h3");
        if (titleElement && serviceTitle) {
          const newTitle = titleElement.textContent;

          // Update the service title with animation
          gsap.to(serviceTitle, {
            duration: 0.1,
            x: -3,
            ease: "power1.inOut",
            onComplete: () => {
              // Change the text content
              serviceTitle.textContent = newTitle;

              // Create shaking effect
              gsap
                .timeline()
                .to(serviceTitle, {
                  duration: 0.05,
                  x: 3,
                  ease: "power1.inOut",
                })
                .to(serviceTitle, {
                  duration: 0.05,
                  x: -2,
                  ease: "power1.inOut",
                })
                .to(serviceTitle, {
                  duration: 0.05,
                  x: 2,
                  ease: "power1.inOut",
                })
                .to(serviceTitle, {
                  duration: 0.05,
                  x: 0,
                  ease: "power1.inOut",
                });
            },
          });
        }
      } else if (index === (current - 1 + cards.length) % cards.length) {
        card.classList.add("left");
      } else if (index === (current + 1) % cards.length) {
        card.classList.add("right");
      }
    });
  }

  // Initialize card positions
  if (cards.length) {
    updateCards();
  }

  // Touch and mouse carousel interactions - keep this for both mobile and desktop
  let startX = 0;
  let isDragging = false;

  const carousel = document.getElementById("carousel");
  if (carousel) {
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          current = (current + 1) % cards.length;
        } else {
          current = (current - 1 + cards.length) % cards.length;
        }
        updateCards();
        isDragging = false;
      }
    });

    carousel.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Mouse drag support
    carousel.addEventListener("mousedown", (e) => {
      startX = e.clientX;
      isDragging = true;
    });

    carousel.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          current = (current + 1) % cards.length;
        } else {
          current = (current - 1 + cards.length) % cards.length;
        }
        updateCards();
        isDragging = false;
      }
    });

    carousel.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Card click support
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        current = (index + 1) % cards.length;
        updateCards();
      });
    });
  }

  // Testimonial card functionality without ScrollTrigger for mobile
  if (!isDesktop()) {
    // Add simple hover/click functionality for testimonial cards on mobile
    const testimonialCards = document.querySelectorAll(".testi-card");
    testimonialCards.forEach((card) => {
      card.addEventListener("click", () => {
        // Remove active class from all cards
        testimonialCards.forEach((c) => c.classList.remove("active"));
        // Add active class to clicked card
        card.classList.add("active");
      });
    });

    // Make the first card active by default on mobile
    if (testimonialCards.length > 0) {
      testimonialCards[0].classList.add("active");
    }
  }

  // Scroll to top - keep this for both mobile and desktop
  const scrollToTop = document.querySelector(".scroll-to-top");
  if (scrollToTop) {
    scrollToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 450,
        behavior: "smooth",
      });
    });
  }
});
