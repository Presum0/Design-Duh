document.addEventListener("DOMContentLoaded", function () {
  // OTP Input Auto Focus
  const otpInputs = document.querySelectorAll(".otp-field");

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 1) {
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Countdown Timer for Resend OTP
  let countdown = 30;
  const countdownElement = document.getElementById("countdown");
  const resendText = document.getElementById("otp-resend");
  const timerText = document.getElementById("otp-timer");

  function startCountdown() {
    countdown = 30;
    resendText.style.display = "none";
    timerText.style.display = "block";

    const timer = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;

      if (countdown <= 0) {
        clearInterval(timer);
        timerText.style.display = "none";
        resendText.style.display = "block";
      }
    }, 1000);
  }

  startCountdown(); // Start countdown when page loads

  // Resend OTP Click Event
  resendText.addEventListener("click", function () {
    startCountdown();
  });
});
const otpFields = document.querySelectorAll(".otp-field");

otpFields.forEach((field, index) => {
  // When user types
  field.addEventListener("input", (e) => {
    // Get the input value
    const input = e.target;

    // Move to next field if this field is filled
    if (input.value.length === 1) {
      // Check if there is a next field
      if (index < otpFields.length - 1) {
        otpFields[index + 1].focus();
      }
    }
  });

  // Handle backspace
  field.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && field.value === "") {
      // Check if there is a previous field
      if (index > 0) {
        otpFields[index - 1].focus();
      }
    }
  });
});

const submitButton = document.querySelector(".otp-submit-button");

// Function to check if all fields are filled
function checkFields() {
  const isFilled = Array.from(otpFields).every(
    (field) => field.value.length === 1
  );
  if (isFilled) {
    submitButton.classList.remove("otp-submit-button");
    submitButton.classList.add("otp-active-button");
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove("otp-active-button");
    submitButton.classList.add("otp-submit-button");
    submitButton.disabled = true;
  }
}

otpFields.forEach((field, index) => {
  // When user types
  field.addEventListener("input", (e) => {
    // Get the input value
    const input = e.target;

    // Move to next field if this field is filled
    if (input.value.length === 1) {
      // Check if there is a next field
      if (index < otpFields.length - 1) {
        otpFields[index + 1].focus();
      }
    }

    // Check if all fields are filled
    checkFields();
  });

  // Handle backspace
  field.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && field.value === "") {
      // Check if there is a previous field
      if (index > 0) {
        otpFields[index - 1].focus();
      }
    }
    // Check fields after backspace
    setTimeout(checkFields, 0);
  });
});

// Initially disable the submit button
submitButton.disabled = true;
