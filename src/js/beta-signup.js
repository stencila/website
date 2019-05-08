document.addEventListener("DOMContentLoaded", function() {
  var $signup = document.getElementById("beta-signup")
  var $signupHeader = $signup.querySelector("header")
  var $signupForm = document
    .getElementById("beta-signup")
    .getElementsByTagName("form")[0]

  if ($signupForm) {
    $signupForm.addEventListener("submit", function(e) {
      e.preventDefault()

      var isValid = $signupForm.checkValidity()

      if (!isValid) return

      // TODO: Submit the form

      /**
       * ￼If the form is valid and successfully submitted, replace the contents with a success message
       **/
      $signupHeader.querySelector("h2").textContent =
        "Thank you! We’ll be in touch shortly"
      $signupHeader.querySelector("span").classList.add("is-hidden")
      $signupForm.classList.add("is-hidden")

      // TODO: Add follow up questions to better understand type of user and use case
      // (research field, number of users, programming language)
    })
  }
})
