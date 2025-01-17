const popup = document.getElementById("popup");

// Show popup
function showPopup() {
  popup.classList.add("active");
}

// Close popup
function closePopup() {
  popup.classList.remove("active");
}

const wrapper = document.querySelector(".wrapper");
const button = document.querySelector(".open-btn");
function openPopup() {
  const popup = document.getElementById("popup");
  const whitestar = document.querySelector(".Whitestar");

  // Add the active class to show the popup
  popup.classList.add("active");

  // Reset and trigger the animation
  whitestar.style.animation = "none"; // Reset animation
  setTimeout(() => {
    whitestar.style.animation = "moveUp 1.5s forwards ease-out"; // Trigger animation
  }, 10);
}

function closePopup() {
  const popup = document.getElementById("popup");

  // Remove the active class to hide the popup
  popup.classList.remove("active");
}
