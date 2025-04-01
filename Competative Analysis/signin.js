document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");
  const emailInput = document.getElementById("email");
  const submitButton = document.querySelector(".signin-submit-button");
  const passwordRequirements = document.querySelector(
    ".signin-password-requirements"
  ); // Make sure you have this in HTML if needed

  // ✅ Toggle password visibility when clicking the eye icon
  if (eyeIcon && passwordInput) {
    eyeIcon.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      eyeIcon.src = isPassword ? "signup-eye-slash.svg" : "signup-eye-icon.svg"; // Toggle eye icon
    });
  }

  // ✅ Show/hide password requirements (if applicable)
  if (passwordRequirements) {
    passwordInput.addEventListener("input", function () {
      passwordRequirements.classList.toggle("hidden", this.value.length === 0);
    });
  }

  // ✅ Activate submit button when both fields are filled
  function checkInputs() {
    if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
      submitButton.classList.add("active-button");
    } else {
      submitButton.classList.remove("active-button");
    }
  }

  // ✅ Add event listeners to check input values
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", checkInputs);
  });
});
