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
  let countdown;
  let timer;
  const countdownElement = document.getElementById("countdown");
  const resendButton = document.getElementById("otp-resend");
  const timerText = document.getElementById("otp-timer");

  function startCountdown() {
    clearInterval(timer); // Clear any existing timers before starting a new one
    countdown = 30;
    resendButton.style.display = "none";
    timerText.style.display = "block";
    countdownElement.textContent = countdown;

    timer = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;

      if (countdown <= 0) {
        clearInterval(timer);
        timerText.style.display = "none";
        resendButton.style.display = "block";
      }
    }, 1000);
  }

  startCountdown(); // Start countdown when page loads

  // Resend OTP Click Event
  resendButton.addEventListener("click", function () {
    startCountdown();
  });

  const otpFields = document.querySelectorAll(".otp-field");

  otpFields.forEach((field, index) => {
    field.addEventListener("input", (e) => {
      if (e.target.value.length === 1 && index < otpFields.length - 1) {
        otpFields[index + 1].focus();
      }
      checkFields();
    });

    field.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && field.value === "" && index > 0) {
        otpFields[index - 1].focus();
      }
      setTimeout(checkFields, 0);
    });
  });

  const submitButton = document.querySelector(".otp-submit-button");

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

  // Initially disable the submit button
  submitButton.disabled = true;
});
