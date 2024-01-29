
 async function validateAndSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    if (!validateForm()) {
      return; // Stop further execution if validation fails
    }
  
    const formData = new FormData(document.getElementById('login-form'));
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Login successful');
        // Optionally redirect or perform other actions upon successful login
     //   window.location.href = 'https://portals.au.edu.pk/students/';
      } else {
        console.error('Login failed:', response.status, response.statusText);
        // Handle the error, show a message, or perform other actions upon failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle unexpected errors during login
    }
  }
  
  function validateForm() {
    var password = document.getElementById('password').value;
  
    // Check maximum length
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
  