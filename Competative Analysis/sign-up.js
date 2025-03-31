document.getElementById("password").addEventListener("click", function () {
  document.getElementById("eyeIcon").classList.toggle("hidden");
});

const passwordInput = document.getElementById("password");
const passwordRequirements = document.querySelector(".password-requirements");

passwordInput.addEventListener("input", function () {
  if (this.value.length > 0) {
    passwordRequirements.classList.remove("hidden");
  } else {
    passwordRequirements.classList.add("hidden");
  }
});

//FORM SIZE
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const formModal = document.querySelector(".form-modal");

  passwordInput.addEventListener("input", function () {
    if (passwordInput.value.length > 0) {
      formModal.style.height = "39.5625rem"; // Expand when typing
    } else {
      formModal.style.height = "34.625rem"; // Reset when empty
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitButton = document.querySelector(".submit-button");
  const eyeIcon = document.getElementById("eyeIcon");
  const formModal = document.querySelector(".form-modal");

  function checkInputs() {
    if (
      firstName.value.trim() !== "" &&
      lastName.value.trim() !== "" &&
      email.value.trim() !== "" &&
      password.value.trim() !== ""
    ) {
      submitButton.classList.add("active-button");
      submitButton.disabled = false; // Enable the button
    } else {
      submitButton.classList.remove("active-button");
      submitButton.disabled = true; // Disable the button
    }
  }

  // Add event listeners to check input values on every input change
  [firstName, lastName, email, password].forEach((input) => {
    input.addEventListener("input", checkInputs);
  });

  // Increase height when user types in password input
  password.addEventListener("input", function () {
    formModal.style.height =
      password.value.length > 0 ? "39.5625rem" : "34.625rem";
    checkInputs();
  });

  // Toggle password visibility when clicking on eye icon
  eyeIcon.addEventListener("click", function () {
    if (password.type === "password") {
      password.type = "text"; // Show password
      eyeIcon.src = "signup-eye-slash.svg"; // Change eye icon (optional)
    } else {
      password.type = "password"; // Hide password
      eyeIcon.src = "signup-eye-icon.svg"; // Change eye icon back (optional)
    }
  });

  // Redirect when the activated submit button is clicked
  submitButton.addEventListener("click", function () {
    if (submitButton.classList.contains("active-button")) {
      window.location.href = "otp-verification.html"; // Change this to your target page
    }
  });
});

//REDIRECT TO SIGH-IN PAGE
document.addEventListener("DOMContentLoaded", function () {
  const signInLink = document.querySelector(".signin-link");

  signInLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = "signin.html"; // Redirect to the sign-in page
  });
});
