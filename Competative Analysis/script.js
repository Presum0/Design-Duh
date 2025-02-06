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

      // After 1 second, trigger the animations for stars, line, and chatbox
      setTimeout(() => {
        // Add animation classes to stars and line
        whitestar.style.animation = "moveUpAndDisappear 1s ease forwards";
        silverstar.style.animation = "moveUpAndDisappear 1s ease forwards";
        line.style.animation = "moveUpAndDisappear 1s ease forwards";

        // Add animation class to chatbox
        const chatBox = document.querySelector(".chat-box");
        chatBox.style.animation = "moveChatboxUp 2s ease forwards";
      }, 1000); // 1 second delay
      return;
    }
  }

  setTimeout(typeEffect, isDeleting ? speed / 2 : speed);
}
