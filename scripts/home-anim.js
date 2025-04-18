document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
    },
  });

  // Animate the logos to move to the center
  tl.to(".logo-container", { width: "400px", height: "270px", duration: 1 });

  // ScrollTrigger for showing and hiding the navbar
  ScrollTrigger.create({
    trigger: ".about-section",
    start: "top bottom",
    // markers: true, // Uncomment for debugging
    onEnter: () => {
      document.querySelector(".reken-nav-container").style.display = "flex"; // Show navbar
      gsap.to(".reken-nav-container", { opacity: 1, duration: 0.5 }); // Fade in
    },
    onLeaveBack: () => {
      gsap.to(".reken-nav-container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.querySelector(".reken-nav-container").style.display = "none"; // Hide navbar
        },
      });
    },
  });

  // ScrollTrigger for hiding the navbar in the service-section
  // ScrollTrigger.create({
  //   trigger: ".services-section",
  //   start: "bottom center",
  //   // markers: true, // Uncomment for debugging
  //   onEnter: () => {
  //     gsap.to(".reken-nav-container", {
  //       opacity: 0,
  //       duration: 0.5,
  //       onComplete: () => {
  //         document.querySelector(".reken-nav-container").style.display = "none"; // Hide navbar
  //       },
  //     });
  //   },
  //   onLeaveBack: () => {
  //     document.querySelector(".reken-nav-container").style.display = "flex"; // Show navbar
  //     gsap.to(".reken-nav-container", { opacity: 1, duration: 0.5 }); // Fade in
  //   },
  // });

  // SVG Scroll animation
  const path = document.querySelector("#svgPath");
  const length = path.getTotalLength();

  // Clear any previous inline styles
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  const svgTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      // markers: true,
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
      onLeave: () => {
        // Show the navbar again after SVG animation ends
        document.querySelector(".reken-nav-container").style.display = "flex";
        gsap.to(".reken-nav-container", { opacity: 1, duration: 0.5 });
      },
      onEnterBack: () => {
        // Hide the navbar when scrolling backward into the SVG animation
        gsap.to(".reken-nav-container", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            document.querySelector(".reken-nav-container").style.display =
              "none";
          },
        });
      },
      onLeaveBack: () => {
        // Show the navbar again after scrolling backward out of the SVG animation
        document.querySelector(".reken-nav-container").style.display = "flex";
        gsap.to(".reken-nav-container", { opacity: 1, duration: 0.5 });
      },
    },
  });

  svgTl.fromTo(
    path,
    { strokeDashoffset: length },
    { strokeDashoffset: 0, duration: 4 } // Increased duration to slow down the animation
  );

  svgTl.fromTo(".about-content-1", { opacity: 0 }, { opacity: 1, duration: 2 });
  svgTl.fromTo(".about-content-2", { opacity: 0 }, { opacity: 1, duration: 2 });

  // SVG animation for the testimonals page
  // SVG Scroll animation
  const path2 = document.querySelector("#svgPath2");
  const length2 = path.getTotalLength();

  // Clear any previous inline styles
  path2.style.strokeDasharray = length2;
  path2.style.strokeDashoffset = length2;

  const svgTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".testimonials-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      // markers: true,
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
      onLeave: () => {
        // Show the navbar again after SVG animation ends
        document.querySelector(".reken-nav-container").style.display = "flex";
        gsap.to(".reken-nav-container", { opacity: 1, duration: 0.5 });
      },
      onEnterBack: () => {
        // Hide the navbar when scrolling backward into the SVG animation
        gsap.to(".reken-nav-container", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            document.querySelector(".reken-nav-container").style.display =
              "none";
          },
        });
      },
      onLeaveBack: () => {
        // Show the navbar again after scrolling backward out of the SVG animation
        document.querySelector(".reken-nav-container").style.display = "flex";
        gsap.to(".reken-nav-container", { opacity: 1, duration: 0.5 });
      },
    },
  });

  svgTl2.fromTo(
    path2,
    { strokeDashoffset: length2 },
    { strokeDashoffset: 0, duration: 5 } // Increased duration to slow down the animation
  );

  gsap.utils.toArray(".testi-card").forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 35%", // trigger a bit earlier than center
      end: "bottom 35%", // keep it active while near center
      toggleClass: { targets: card, className: "active" },
      // markers: true,
      once: false,
    });
  });

  const videos = document.querySelectorAll("#hover-video");

  // Flag to track if the user has interacted with the page
  let userInteracted = false;

  // Listen for user interaction (e.g., click or keypress)
  const enableInteraction = () => {
    userInteracted = true;
    console.log("User interaction detected, unmuting allowed.");
    document.removeEventListener("click", enableInteraction);
    document.removeEventListener("keydown", enableInteraction);
  };

  document.addEventListener("click", enableInteraction);
  document.addEventListener("keydown", enableInteraction);

  videos.forEach((video) => {
    // Unmute the video on hover if the user has interacted
    video.addEventListener("mouseenter", () => {
      if (userInteracted) {
        video.muted = false;
        video
          .play()
          .then(() => {
            console.log("Video unmuted and playing on hover");
          })
          .catch((error) => {
            console.error("Error playing video:", error);
          });
      } else {
        console.warn("Cannot unmute video: User interaction required.");
      }
    });

    // Mute the video when the hover ends
    video.addEventListener("mouseleave", () => {
      video.muted = true;
    });
  });

  // service section animation
  const cards = document.querySelectorAll(".card");
  const serviceTitle = document.querySelector(".service-title");
  let current = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "left", "right");

      if (index === current) {
        card.classList.add("active");
        // update the service title based on the current card
        serviceTitle.textContent =
          card.getElementsByTagName("h3")[0].textContent;
      } else if (index === (current - 1 + cards.length) % cards.length) {
        card.classList.add("left");
      } else if (index === (current + 1) % cards.length) {
        card.classList.add("right");
      }
    });
  }

  updateCards();

  let startX = 0;
  let isDragging = false;

  const carousel = document.getElementById("carousel");

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

  carousel.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Card click support
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      current = (index + 1) % cards.length; // or (index - 1 + cards.length) % cards.length for reverse order
      updateCards();
    });
  });
});
