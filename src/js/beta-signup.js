document.addEventListener("DOMContentLoaded", function() {
  var $signup = document.getElementById("beta-signup")

  if (!$signup) return

  var $signupHeader = $signup.querySelector("header")
  var $signupButton = $signup.querySelector("button")
  var $signupForm = document
    .getElementById("beta-signup")
    .getElementsByTagName("form")[0]

  var $signUpFormIsSubmitting = false

  var disableSubmit = function() {
    $signUpFormIsSubmitting = true
    $signupButton.setAttribute("disabled", true)
    $signupButton.classList.add("is-loading")
  }

  var enableSubmit = function() {
    $signUpFormIsSubmitting = false
    $signupButton.removeAttribute("disabled")
    $signupButton.classList.remove("is-loading")
  }

  /**
   * ￼If the form is valid and successfully submitted, replace the contents with a success message
   **/
  var onFormSubmitSuccess = function() {
    $signupHeader.querySelector("h2").textContent =
      "Thank you! We’ll be in touch shortly"
    $signupHeader.querySelector("span").classList.add("is-hidden")
    $signupForm.classList.add("is-hidden")

    // TODO: Add follow up questions to better understand type of user and use case
    // (research field, number of users, programming language)
  }

  var onFormSubmitError = function() {
    enableSubmit()

    var e = document.createElement("div")
    e.innerHTML =
      '<div class="notification is-danger top-right"><button class="delete"></button>Something seems to have gone wrong. Please try again, or email <a href="mailto:hello@stenci.la">hello@stenci.la</a></div>'
    document.body.appendChild(e)
    e.querySelector("button.delete").addEventListener("click", function() {
      document.body.removeChild(e)
    })
  }

  $signupForm.addEventListener("submit", function(e) {
    e.preventDefault()

    var isValid = $signupForm.checkValidity()

    if (!isValid || $signUpFormIsSubmitting) return

    // Prevent sending multiple requests
    disableSubmit()

    reqwest({
      url: "https://hooks.zapier.com/hooks/catch/4858372/jzpwsa/",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      crossOrigin: true,
      data: reqwest.serialize($signupForm),
      success: onFormSubmitSuccess,
      error: onFormSubmitError
      // complete: onFormSubmitCompletion
    })
  })
})
