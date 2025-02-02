const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

console.log("Lenis is running!");
console.log("Index Script is running!");
requestAnimationFrame(raf);
