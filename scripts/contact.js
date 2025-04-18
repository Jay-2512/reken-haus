document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".chip-group").forEach((group) => {
    group.addEventListener("click", (e) => {
      if (e.target.classList.contains("chip")) {
        // toggle style
        e.target.classList.toggle("selected");

        // Uncomment this below for single-select behavior
        [...group.children].forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
      }
    });
  });
});
