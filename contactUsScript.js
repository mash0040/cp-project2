(function () {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from(".navbar-brand, .navbar-toggler", {
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      y: 10,
    });
  
    gsap.from(".nav-item", {
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      y: 30,
      stagger: 0.2,
    });
})
  
    // Function to toggle the navigation bar
    function menuOnClick() {
      document.getElementById("menu-bar").classList.toggle("change");
      document.getElementById("nav").classList.toggle("change");
      document.getElementById("menu-bg").classList.toggle("change-bg");
    }

// Form Validation

document.addEventListener("DOMContentLoaded", function () {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const businessType = document.querySelector("#businessType");
  const type = document.querySelector("#type");
  const budget = document.querySelector("#budget");
  const date = document.querySelector("#date");
  const time = document.querySelector("#time");
  const description = document.querySelector("#desciption");
  const attachment = document.querySelector("#attachment");
  const privacyAgree = document.querySelector("#dot-1");
  const privacyDisagree = document.querySelector("#dot-2");

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const businessTypeError = document.querySelector("#businessTypeError");
  const typeError = document.querySelector("#typeError");
  const budgetError = document.querySelector("#budgetError");
  const dateError = document.querySelector("#dateError");
  const timeError = document.querySelector("#timeError");
  const descriptionError = document.querySelector("#desciptionError");
  const attachmentError = document.querySelector("#attachmentError");
  const dotError = document.querySelector("#dotError");

  function validateForm() {
    let isValid = true;

    function showError(element, errorMessage) {
      element.textContent = errorMessage;
      element.style.color = "red";
      isValid = false;
    }

    function clearError(element) {
      element.textContent = "";
    }

    if (!name.value.trim()) {
      showError(nameError, "*");
    } else {
      clearError(nameError);
    }

    const emailValue = email.value.trim();
    if (!emailValue) {
      showError(emailError, "*");
    } else if (!validateEmail(emailValue)) {
      showError(emailError, "*");
    } else {
      clearError(emailError);
    }

    if (!businessType.value.trim()) {
      showError(businessTypeError, "*");
    } else {
      clearError(businessTypeError);
    }

    if (!type.value.trim()) {
      showError(typeError, "*");
    } else {
      clearError(typeError);
    }

    if (!budget.value.trim()) {
      showError(budgetError, "*");
    } else {
      clearError(budgetError);
    }

    if (!date.value.trim()) {
      showError(dateError, "*");
    } else {
      clearError(dateError);
    }

    if (!time.value.trim()) {
      showError(timeError, "*");
    } else {
      clearError(timeError);
    }

    if (!description.value.trim()) {
      showError(descriptionError, "*");
    } else {
      clearError(descriptionError);
    }

    // You can add more specific validations for the attachment if needed.

    if (!privacyAgree.checked && !privacyDisagree.checked) {
      showError(dotError, "Please agree or disagree to the Privacy Statement.");
    } else {
      clearError(dotError);
    }

    return isValid;
  }

  document.querySelector("#movieReviewForm").addEventListener("submit", function (event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  function validateEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }
});


