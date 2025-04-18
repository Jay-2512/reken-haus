const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

console.log("Lenis is enabled!");
requestAnimationFrame(raf);
