// Function to enable infinite scroll for a given container
const setupInfiniteScroll = (containerSelector) => {
  const container = document.querySelector(containerSelector);

  if (!container) return; // Exit if the container doesn't exist

  // Duplicate the scroll items for seamless infinite scroll
  const duplicateItems = () => {
    const items = Array.from(container.children); // Get all the current items
    items.forEach((item) => {
      const clone = item.cloneNode(true); // Clone each item
      container.appendChild(clone); // Append the cloned item to the end
    });
    items.forEach((item) => {
      const clone = item.cloneNode(true); // Clone again for bidirectional looping
      container.insertBefore(clone, container.firstChild); // Prepend the cloned items
    });
  };

  // Initialize duplicates
  duplicateItems();

  // Set initial scroll position to the middle set of items
  container.scrollLeft = container.scrollWidth / 3;

  // Handle seamless bidirectional infinite scroll
  const infiniteScroll = () => {
    const maxScrollLeft = container.scrollWidth / 1.5; // Middle of the duplicated content
    const minScrollLeft = container.scrollWidth / 3; // Start of the middle set

    if (container.scrollLeft <= minScrollLeft) {
      // If scrolled too far left, reset to the end
      container.scrollLeft += minScrollLeft;
    } else if (container.scrollLeft >= maxScrollLeft) {
      // If scrolled too far right, reset to the start
      container.scrollLeft -= minScrollLeft;
    }
  };

  // Add infinite scroll on scroll event
  container.addEventListener("scroll", infiniteScroll);

  // Automatic Infinite Scroll Animation
  const startAutoScroll = () => {
    setInterval(() => {
      container.scrollLeft += 1; // Adjust speed by modifying the increment
    }, 10); // Lower interval for smoother scroll
  };

  // Start the auto-scroll
  startAutoScroll();
};

// Apply infinite scroll to both containers
setupInfiniteScroll(".carousel-container"); // First container
setupInfiniteScroll(".scroll-logo-text");  // Second container
