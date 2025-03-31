//EYE Button
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

//PASSWARD TO TEXT
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");
  const formModal = document.querySelector(".form-modal");

  // Toggle password visibility when clicking on eye icon
  eyeIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text"; // Show password
      eyeIcon.src = "signup-eye-open-icon.svg"; // Change eye icon (optional)
    } else {
      passwordInput.type = "password"; // Hide password
      eyeIcon.src = "signup-eye-icon.svg"; // Change eye icon back (optional)
    }
  });
});

//ACTIVATED SUBMIT BUTTON
document.addEventListener("DOMContentLoaded", function () {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitButton = document.querySelector(".submit-button");
  const eyeIcon = document.getElementById("eyeIcon");
  const formModal = document.querySelector(".form-modal");

  function checkInputs() {
    if (email.value.trim() !== "" && password.value.trim() !== "") {
      submitButton.classList.add("active-button");
    } else {
      submitButton.classList.remove("active-button");
    }
  }

  // Add event listeners to check input values on every input change
  [email, password].forEach((input) => {
    input.addEventListener("input", checkInputs);
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
});
