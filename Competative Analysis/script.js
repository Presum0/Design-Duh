const popup = document.getElementById("popup");
const whitestar = document.querySelector(".Whitestar");
const silverstar = document.querySelector(".silverstar");
const circles = document.querySelectorAll(".circle-container img");
const text = document.querySelector(".text");
const pulse = document.querySelector(".pulse");
const line = document.querySelector(".line");
const creativityImages = document.querySelectorAll(".creativity-text img");
const creativityText = document.querySelector(".creativity-text");
const creativityDescription = document.querySelector(".creativity-description");
const textElement = document.querySelector(".text-animation");
const cursorElement = document.querySelector(".cursor-img");
const chatBox = document.querySelector(".chat-box");
const dragCard = document.querySelector(".drag-card");
const dragCardContainer = document.querySelector(".drag-card-container");
const chatInput = document.querySelector(".chat-input"); // Select chat input field

const words = [" desired ", " design ", " desired ", " design "];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 200;
const delay = 1000;
let hasCompletedCycle = false;

function showPopup() {
  popup.classList.add("active");
  document.body.classList.add("no-scroll");
  document.documentElement.classList.add("no-scroll");
  resetElements();

  setTimeout(() => {
    animateStars();
    animateLine();

    setTimeout(() => {
      animateCircles();

      setTimeout(() => {
        animatePulse();
        animateCreativityImages();
      }, circles.length * 300);
    }, 1500);
  }, 10);

  if (!hasCompletedCycle) {
    typeEffect();
  }
}

function resetElements() {
  whitestar.style.animation = "none";
  silverstar.style.animation = "none";
  line.style.animation = "none";

  circles.forEach((circle) => {
    circle.style.animation = "none";
    circle.style.opacity = "0";
  });

  pulse.style.animation = "none";
  pulse.style.opacity = "0";
  text.style.opacity = "0";
  textElement.textContent = "";
  hasCompletedCycle = false;

  creativityImages.forEach((img, index) => {
    if (index !== creativityImages.length - 1) {
      img.style.opacity = "0";
    }
  });

  // Hide the drag-card initially
  dragCard.style.opacity = "0";
  dragCard.classList.remove("visible"); // Remove visible class
}

function animateStars() {
  whitestar.style.animation = "moveUpWhitestar 1.5s forwards ease-out";
  silverstar.style.animation = "moveUpWhitestar 1.5s forwards ease-out";
}

function animateLine() {
  line.style.animation =
    "moveUpLine 1.5s forwards ease-out, glowEffect 5s 1.5s forwards ease-in";
}

function animateCircles() {
  circles.forEach((circle, index) => {
    setTimeout(() => {
      circle.style.opacity = "1";
      setTimeout(() => {
        circle.style.opacity = "0";
      }, 300);
    }, index * 200);
  });
}

function animatePulse() {
  pulse.style.animation =
    "pulseEffect 1s ease-in forwards, fadeOut 5s ease-in forwards 1s";
  pulse.style.opacity = "1";
}

function animateCreativityImages() {
  creativityImages.forEach((img, index) => {
    setTimeout(() => {
      img.style.opacity = "1";
      if (index !== creativityImages.length - 1) {
        setTimeout(() => {
          img.style.opacity = "0";
        }, 400);
      }
    }, index * 300);
  });

  setTimeout(() => {
    creativityDescription.style.opacity = "1";
  }, creativityImages.length * 300 + 500);
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("no-scroll");
  document.documentElement.classList.remove("no-scroll");
  resetElements();
}

function typeEffect() {
  let currentWord = words[index];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  textElement.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), delay);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;

    if (index === words.length) {
      hasCompletedCycle = true;
      cursorElement.style.display = "none";

      creativityText.style.transition = "opacity 0.5s ease-in";
      creativityDescription.style.transition = "opacity 0.5s ease-in";
      creativityText.style.opacity = "0";
      creativityDescription.style.opacity = "0";

      // Change background to white
      popup.classList.add("white-background");

      // After 1 second, trigger animations for stars, line, and chatbox
      setTimeout(() => {
        // Add animation classes to stars and line
        whitestar.style.animation = "moveUpAndDisappear 1s ease forwards";
        silverstar.style.animation = "moveUpAndDisappear 1s ease forwards";
        line.style.animation = "moveUpAndDisappear 1s ease forwards";

        // Move chatbox up
        chatBox.style.animation = "moveChatboxUp 2s ease forwards";

        // After chatbox moves up, show drag-card
        setTimeout(() => {
          dragCard.style.opacity = "1";
          dragCard.classList.add("visible"); // Add visible class
        }, 1000); // Show dragCard after chatbox animation finishes
      }, 1000);
      return;
    }
  }

  setTimeout(typeEffect, isDeleting ? speed / 2 : speed);
}

// 🔹 Add Scroll Blur Effect for .drag-card
function updateBlurEffect() {
  if (dragCard.style.opacity === "1") {
    // Ensure drag-card is visible
    if (dragCard.scrollLeft > 0) {
      dragCardContainer.classList.add("show-left-blur");
    } else {
      dragCardContainer.classList.remove("show-left-blur");
    }

    if (dragCard.scrollLeft + dragCard.clientWidth < dragCard.scrollWidth) {
      dragCardContainer.classList.add("show-right-blur");
    } else {
      dragCardContainer.classList.remove("show-right-blur");
    }
  } else {
    dragCardContainer.classList.remove("show-left-blur", "show-right-blur");
  }
}

// Attach event listener for scroll blur effect
dragCard.addEventListener("scroll", updateBlurEffect);

// ✅ Ensure blur effect is updated when drag-card becomes visible
const observer = new MutationObserver(() => {
  if (dragCard.style.opacity === "1") {
    updateBlurEffect(); // Apply blur effect when visible
  }
});

observer.observe(dragCard, { attributes: true, attributeFilter: ["style"] });

// 🔹 Remove Placeholder on Click
chatInput.addEventListener("focus", function () {
  this.placeholder = ""; // Remove placeholder on focus
});

chatInput.addEventListener("blur", function () {
  this.placeholder = "Enter your prompt here"; // Restore placeholder when input loses focus
});

//CHATBOX BUTTON

document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.querySelector(".chat-box-1");
  const chatInput = document.querySelector(".chat-input");
  const objButtons = document.querySelectorAll(".obj-btn");

  objButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Find the closest `.objective` and get the description
      const objDescription = button
        .closest(".objective")
        .querySelector(".obj-description").innerText;

      // Insert full text into the chat input
      chatInput.value = objDescription;
      chatInput.style.height = "auto"; // Reset height
      chatInput.style.height = chatInput.scrollHeight + "px"; // Adjust height dynamically

      // Increase chatbox size based on content
      chatBox.style.maxHeight = chatInput.scrollHeight + 40 + "px";
    });
  });

  // Hide text when clicking outside the chatbox
  document.addEventListener("click", function (event) {
    if (
      !chatBox.contains(event.target) &&
      ![...objButtons].some((btn) => btn.contains(event.target))
    ) {
      chatInput.value = ""; // Clear the text
      chatBox.style.maxHeight = "144px"; // Reset chatbox height
    }
  });
});

//OBJ-BUTTON
document.addEventListener("DOMContentLoaded", function () {
  const objButtons = document.querySelectorAll(".obj-btn");
  const dragContainer = document.querySelector(".drag-card-container");
  const chatBox = document.querySelector(".chat-box");

  objButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents bubbling

      // Hide drag-container
      dragContainer.style.display = "none";

      // Move chat-box up smoothly
      chatBox.style.transform = "translateY(-200px)"; // Adjust value as needed
      chatBox.style.transition = "transform 0.3s ease-in-out";
    });
  });

  // Show drag-container when clicking outside chat-box
  document.addEventListener("click", function (event) {
    if (!chatBox.contains(event.target)) {
      dragContainer.style.display = "block";

      // Reset chat-box position
      chatBox.style.transform = "translateY(0)";
    }
  });
});

// POPUP-GRID
function openPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("active");

  // Delay adding white background to allow smooth transition
  setTimeout(() => {
    popup.classList.add("white-background");
  }, 300);
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("white-background");

  // Delay hiding popup to sync with transition
  setTimeout(() => {
    popup.classList.remove("active");
  }, 300);
}

// SECOND TIME POPUP OPEN

let isFirstOpen = true; // Flag to track if popup is opened for the first time

function showPopup() {
  popup.classList.add("active");
  document.body.classList.add("no-scroll");
  document.documentElement.classList.add("no-scroll");

  if (isFirstOpen) {
    // First time: Run animations
    resetElements();

    setTimeout(() => {
      animateStars();
      animateLine();

      setTimeout(() => {
        animateCircles();

        setTimeout(() => {
          animatePulse();
          animateCreativityImages();
        }, circles.length * 300);
      }, 1500);
    }, 10);

    if (!hasCompletedCycle) {
      typeEffect();
    }

    isFirstOpen = false; // Set flag to false after first open
  } else {
    // Subsequent opens: Skip animations and directly show white background
    popup.classList.add("white-background");

    // Ensure chatbox and drag-card are visible
    chatBox.style.animation = "moveChatboxUp 2s ease forwards";
    dragCard.style.opacity = "1";
    dragCard.classList.add("visible");

    // Hide elements that are part of the initial animations
    whitestar.style.display = "none";
    silverstar.style.display = "none";
    line.style.display = "none";
    pulse.style.display = "none";
    creativityText.style.display = "none";
    creativityDescription.style.display = "none";
  }
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("no-scroll");
  document.documentElement.classList.remove("no-scroll");
  popup.classList.remove("white-background"); // Remove white background

  // Reset hidden elements
  whitestar.style.display = "block";
  silverstar.style.display = "block";
  line.style.display = "block";
  pulse.style.display = "block";
  creativityText.style.display = "block";
  creativityDescription.style.display = "block";

  resetElements();
}

function toggleAttachment(button) {
  button.classList.toggle("active");
}

//RECTANGULAR TREY
document.addEventListener("DOMContentLoaded", function () {
  const dropdownIcon = document.getElementById("dropdownIcon");
  const upIcon = document.getElementById("upIcon");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const treyWrapper = document.querySelector(".rectangle-trey-wrapper");

  function toggleDropdown(event) {
    event.stopPropagation();
    const isDropdownVisible = dropdownMenu.classList.contains("show-dropdown");

    if (isDropdownVisible) {
      dropdownMenu.classList.remove("show-dropdown");
      upIcon.style.display = "none";
      dropdownIcon.style.display = "inline";
      treyWrapper.classList.remove("dropdown-open"); // ✅ Allow text animation again
    } else {
      dropdownMenu.classList.add("show-dropdown");
      dropdownIcon.style.display = "none"; // ✅ Hide down icon
      upIcon.style.display = "inline"; // ✅ Show up icon
      treyWrapper.classList.add("dropdown-open"); // ❌ Stop text animation
    }
  }

  dropdownIcon.addEventListener("click", toggleDropdown);
  upIcon.addEventListener("click", toggleDropdown);

  document.addEventListener("click", function () {
    dropdownMenu.classList.remove("show-dropdown");
    upIcon.style.display = "none";
    dropdownIcon.style.display = "inline";
    treyWrapper.classList.remove("dropdown-open"); // ✅ Allow text animation again
  });

  dropdownMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // ✅ Ensure hover effect doesn't hide the icon when dropdown is open
  treyWrapper.addEventListener("mouseenter", function () {
    if (!dropdownMenu.classList.contains("show-dropdown")) {
      dropdownIcon.style.opacity = "1";
    }
  });

  treyWrapper.addEventListener("mouseleave", function () {
    if (!dropdownMenu.classList.contains("show-dropdown")) {
      dropdownIcon.style.opacity = "0";
    }
  });
});
// Select all dropdown items
const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownItems.forEach((item) => {
  const icon = item.querySelector(".dropdown-icon-img");
  const defaultSrc = item.getAttribute("data-default");
  const hoverSrc = item.getAttribute("data-hover");

  // Change to hover icon on mouseenter
  item.addEventListener("mouseenter", () => {
    icon.src = hoverSrc;
  });

  // Revert to default icon on mouseleave
  item.addEventListener("mouseleave", () => {
    icon.src = defaultSrc;
  });
});

////*********   NAVBAR   ******////
