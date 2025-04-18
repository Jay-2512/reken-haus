document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".lazy-video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // load and play
          const source = video.querySelector("source");
          if (source && !video.src) {
            source.src = source.dataset.src;
            video.load();
          }
          video.play();
          console.log("Video is playing");
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  videos.forEach((video) => observer.observe(video));
});
