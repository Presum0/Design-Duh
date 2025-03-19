function generateResponse() {
  const navbarText = document.getElementById("navbar-text");

  // Change text to "Generating Response"
  navbarText.textContent = "Competitive Analysis: Generating Response";

  // Simulate response time (e.g., 3 seconds) and revert text back
  setTimeout(() => {
    navbarText.textContent = "Competitive Analysis";
  }, 3000); // 3000ms = 3 seconds
}

// Example: Call the function when the home button is clicked
const homeButton = document.querySelector(".home-button");
homeButton.addEventListener("click", generateResponse);

//STAR ANIMATION
const stars = document.querySelectorAll(".star-icon");

let currentIndex = 0;
let rotationAngle = 0;
let rounds = 0; // Track the number of rounds

function showNextImage() {
  // Remove active class from current image
  stars[currentIndex].classList.remove("active");

  // Calculate next index
  currentIndex = (currentIndex + 1) % stars.length;

  // Update rotation angle for the next image
  rotationAngle += 15;

  // Apply rotation and activate the next image
  stars[currentIndex].style.transform = `rotate(${rotationAngle}deg)`;
  stars[currentIndex].classList.add("active");

  // Check if a full round is completed
  if (currentIndex === stars.length - 1) {
    rounds += 1; // Increase round count

    // After 3 rounds, replace stars with CompetativeAnalysis-icon.svg
    if (rounds === 2) {
      setTimeout(() => {
        // Remove all star icons
        stars.forEach((star) => star.remove());

        // Create a new icon element without rotation
        const newIcon = document.createElement("img");
        newIcon.src = "CompetativeAnalysis-icon.svg";
        newIcon.alt = "Competative Analysis Icon";
        newIcon.className = "new-icon";
        newIcon.style.width = "28px";
        newIcon.style.height = "28px";

        // Append the new icon to the button
        homeButton.appendChild(newIcon);
      }, 1000); // Delay for smoother transition
    }
  }
}

// Initial activation of the first image
stars[currentIndex].classList.add("active");

// Change image every 1 second
setInterval(showNextImage, 1000); // Change every 1 second

//DROPSHEET
document.addEventListener("DOMContentLoaded", function () {
  const dynamicIsland = document.querySelector(".dynamic-island-landing");
  const scrollContainer = document.querySelector(".scroll-container");
  let buttons = Array.from(document.querySelectorAll(".button-container"));
  const visibleButtons = 7; // Number of visible buttons at a time
  const middleIndex = Math.floor(visibleButtons / 2); // Fixed middle position
  let selectedIndex = middleIndex; // Initially select the middle button
  let dropsheetTimer; // Timer for dropsheet delay

  function updateSelection(newIndex) {
    if (!dynamicIsland.classList.contains("show-dropsheet")) return; // Stop if dropsheet is closed

    selectedIndex = (newIndex + buttons.length) % buttons.length; // Ensure looping

    // Move buttons to maintain loop effect
    scrollContainer.innerHTML = "";
    let reorderedButtons = [
      ...buttons.slice(selectedIndex),
      ...buttons.slice(0, selectedIndex),
    ];

    reorderedButtons.forEach((btn, index) => {
      scrollContainer.appendChild(btn);
      btn.classList.toggle("selected", index === middleIndex); // Mark middle as selected

      // Always show the name of the selected button
      const buttonName = btn.querySelector(".button-name");
      buttonName.style.display = index === middleIndex ? "block" : "none";
    });
  }

  // Show button name on hover (only when dropsheet is open)
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (dynamicIsland.classList.contains("show-dropsheet")) {
        btn.querySelector(".button-name").style.display = "block";
      }
    });
    btn.addEventListener("mouseleave", () => {
      if (!btn.classList.contains("selected")) {
        btn.querySelector(".button-name").style.display = "none";
      }
    });
  });

  // Click event for selection (only when dropsheet is open)
  buttons.forEach((btn, index) =>
    btn.addEventListener("click", () => {
      if (dynamicIsland.classList.contains("show-dropsheet")) {
        updateSelection(index);
      }
    })
  );

  // Keyboard navigation (Arrow keys, only when dropsheet is open)
  document.addEventListener("keydown", (e) => {
    if (dynamicIsland.classList.contains("show-dropsheet")) {
      if (e.key === "ArrowRight") updateSelection(selectedIndex + 1);
      else if (e.key === "ArrowLeft") updateSelection(selectedIndex - 1);
    }
  });

  // Dropsheet animation logic
  dynamicIsland.addEventListener("mouseenter", () => {
    dropsheetTimer = setTimeout(() => {
      dynamicIsland.classList.add("show-dropsheet");
      updateSelection(selectedIndex); // Start selection when dropsheet opens
    }, 500); // 0.5 seconds delay
  });

  dynamicIsland.addEventListener("mouseleave", () => {
    clearTimeout(dropsheetTimer); // Prevent delayed execution if mouse exits early
    dynamicIsland.classList.remove("show-dropsheet");
  });

  // Observe when dropsheet opens/closes
  const observer = new MutationObserver(() => {
    if (dynamicIsland.classList.contains("show-dropsheet")) {
      updateSelection(selectedIndex);
    }
  });

  observer.observe(dynamicIsland, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
document.querySelectorAll(".button-container-bg").forEach((btnBg) => {
  btnBg.addEventListener("click", function () {
    // Remove 'selected' from all buttons
    document
      .querySelectorAll(".button-container-bg")
      .forEach((el) => el.classList.remove("selected"));

    // Add 'selected' to the clicked button
    this.classList.add("selected");
  });
});
