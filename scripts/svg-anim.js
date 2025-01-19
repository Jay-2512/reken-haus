gsap.registerPlugin(ScrollTrigger);

const path = document.querySelector("#svgPath");
const length = path.getTotalLength();

// Clear any previous inline styles
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-sec-about",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    // markers: true,
  },
});

tl.fromTo(
  path,
  { strokeDashoffset: length },
  { strokeDashoffset: 0, duration: 4 } // Increased duration to slow down the animation
);

tl.fromTo(".about-p-1", { opacity: 0 }, { opacity: 1, duration: 2 });

tl.fromTo(".about-p-2", { opacity: 0 }, { opacity: 1, duration: 2 });

// Animation for the testimonial SVG
const testimonialPath = document.querySelector("#testimonialSvg path");
const testimonialLength = testimonialPath.getTotalLength();

// Clear any previous inline styles
testimonialPath.style.strokeDasharray = testimonialLength;
testimonialPath.style.strokeDashoffset = testimonialLength;

const testimonialTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-sec-testimonials",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    // markers: true,
  },
});

testimonialTl.fromTo(
  testimonialPath,
  { strokeDashoffset: testimonialLength },
  { strokeDashoffset: 0, duration: 4 } // Adjust duration as needed
);

// Reveal testimonial cards one by one
testimonialTl.fromTo(
  ".testimonial-card.card-1",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 },
  "-=3" // Start 1 second before the SVG animation ends
);

testimonialTl.fromTo(
  ".testimonial-card.card-2",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 },
  "-=2.5" // Start 0.5 seconds after the previous card
);

testimonialTl.fromTo(
  ".testimonial-card.card-3",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 },
  "-=2" // Start 0.5 seconds after the previous card
);

testimonialTl.fromTo(
  ".testimonial-card.card-4",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 },
  "-=1.5" // Start 0.5 seconds after the previous card
);

testimonialTl.fromTo(
  ".testimonial-card.card-5",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 },
  "-=1" // Start 0.5 seconds after the previous card
);
