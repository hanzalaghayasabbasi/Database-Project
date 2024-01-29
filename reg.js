async function validateAndSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (!validateForm()) {
    return; // Stop further execution if validation fails
  }

  // If the form is valid, submit it to the server using fetch
  const formData = new FormData(document.getElementById('registration-form'));

  try {
    const response = await fetch('/submit_registration', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Registration successful!');
      // Optionally redirect or perform other actions upon successful registration
    } else {
      console.error('Registration failed:', response.status, response.statusText);
      // Handle the error, show a message, or perform other actions upon failed registration
    }
  } catch (error) {
    console.error('Error during registration:', error);
    // Handle unexpected errors during registration
  }
}

function validateForm() {
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  if (password.length < 10) {
    alert("Password must be at most 10 characters.");
    return false;
  }

  // Check for at least 2 special characters and 1 number
  var specialCharCount = password.replace(/[^!@#$%^&*(),.?":{}|<>]/g, '').length;
  var numberCount = password.replace(/[^0-9]/g, '').length;

  if (specialCharCount < 2 || numberCount < 1) {
    alert("Password must contain at least 2 special characters and 1 number.");
    return false;
  }

  return true;
}