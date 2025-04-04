document.addEventListener("DOMContentLoaded", () => {
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
});
