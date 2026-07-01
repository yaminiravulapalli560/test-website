// load the header
fetch("header.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    document.getElementById("header").innerHTML = data;
    showAuthLinks(); // show login or logout
  })
  .catch(function (error) {
    // header didn't load - usually because the page is opened as a file.
    // open it with live server instead.
    console.error("header not loading, use live server", error);
  });


// show logout if the user is logged in, else show login
function showAuthLinks() {
  var loginLink = document.getElementById("login-link");
  var logoutLink = document.getElementById("logout-link");
  if (!loginLink || !logoutLink) {
    return;
  }
  if (sessionStorage.getItem("loggedIn") === "true") {
    loginLink.style.display = "none";
    logoutLink.style.display = "inline";
  } else {
    loginLink.style.display = "inline";
    logoutLink.style.display = "none";
  }
}


// logout - clear everything and go back to login
function logout(event) {
  event.preventDefault();
  sessionStorage.clear();
  window.location.href = "login.html";
}


// load the footer
fetch("footer.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(function (error) {
    console.error("footer not loading, use live server", error);
  });


// ---------- login ----------

// our fixed email and password to check against
var LOGIN_EMAIL = "yamini@gmail.com";
var LOGIN_PASSWORD = "12345";

function validateLogin(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");
  var loginMessage = document.getElementById("loginMessage");

  // remove old messages
  emailError.textContent = "";
  passwordError.textContent = "";
  loginMessage.textContent = "";

  // email box checks
  if (email === "") {
    emailError.textContent = "Email is required.";
    return false;
  }
  if (email.indexOf("@") === -1) {
    emailError.textContent = "Please enter a valid email.";
    return false;
  }

  // password box check
  if (password === "") {
    passwordError.textContent = "Password is required.";
    return false;
  }

  // is the email and password correct?
  if (email === LOGIN_EMAIL && password === LOGIN_PASSWORD) {
    // remember that we are logged in
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("email", email);

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login Successful";
    window.location.href = "index.html";
  } else {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Invalid Email or Password.";
  }
  return false;
}


// ---------- signup ----------

function validateSignup(event) {
  event.preventDefault();

  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var phone = document.getElementById("phone-number").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  var firstNameError = document.getElementById("firstNameError");
  var lastNameError = document.getElementById("lastNameError");
  var phoneError = document.getElementById("phoneError");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");

  // remove old messages
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  // first name - needs 3 letters
  if (firstName === "") {
    firstNameError.textContent = "First name is required.";
    return false;
  }
  if (firstName.length < 3) {
    firstNameError.textContent = "First name must be at least 3 characters.";
    return false;
  }

  // last name
  if (lastName === "") {
    lastNameError.textContent = "Last name is required.";
    return false;
  }

  // phone - must be 10 numbers
  if (phone === "") {
    phoneError.textContent = "Phone number is required.";
    return false;
  }
  if (phone.length !== 10 || isNaN(phone)) {
    phoneError.textContent = "Phone number must be 10 digits.";
    return false;
  }

  // email
  if (email === "") {
    emailError.textContent = "Email is required.";
    return false;
  }
  if (email.indexOf("@") === -1) {
    emailError.textContent = "Please enter a valid email.";
    return false;
  }

  // password - at least 8 characters
  if (password === "") {
    passwordError.textContent = "Password is required.";
    return false;
  }
  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    return false;
  }

  // both passwords should be same
  if (confirmPassword !== password) {
    confirmPasswordError.textContent = "Passwords do not match.";
    return false;
  }

  // all good - save the details
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("lastName", lastName);
  sessionStorage.setItem("phone", phone);
  sessionStorage.setItem("email", email);

  alert("Registration Successful");
  window.location.href = "login.html";
  return false;
}


// ---------- contact us ----------

function validateContact(event) {
  event.preventDefault();

  // get the values
  var name = document.getElementById("contact-name").value;
  var email = document.getElementById("contact-email").value;
  var phone = document.getElementById("contact-phone").value;
  var subject = document.getElementById("contact-subject").value;
  var message = document.getElementById("contact-message").value;

  // clear old messages
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";
  document.getElementById("successMessage").textContent = "";

  // name - 15 letters, only letters
  if (name.length < 15 || !/^[A-Za-z]+$/.test(name)) {
    document.getElementById("nameError").textContent = "Enter a valid name (min 15 letters).";
    return false;
  }

  // email
  if (email.indexOf("@") === -1) {
    document.getElementById("emailError").textContent = "Please enter a valid email.";
    return false;
  }

  // phone - 10 numbers
  if (phone.length !== 10 || isNaN(phone)) {
    document.getElementById("phoneError").textContent = "Phone number must be 10 digits.";
    return false;
  }

  // subject
  if (subject === "") {
    document.getElementById("subjectError").textContent = "Subject is required.";
    return false;
  }

  // message - at least 20 characters
  if (message.length < 20) {
    document.getElementById("messageError").textContent = "Message must be at least 20 characters.";
    return false;
  }

  // all good - show message and empty the form
  document.getElementById("successMessage").textContent = "Message Sent Successfully!";
  document.getElementById("contact-form").reset();
  return false;
}
