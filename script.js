// Date/Time function
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById("currentDateTime").textContent = formattedDateTime;
}

// Run the function immediately and update every second
setInterval(updateDateTime, 1000);
updateDateTime();

var slider = document.getElementById("painscale");
var output = document.getElementById("rangedisplay");
if (slider && output) {
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
    };
}

function checkMatch() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var message = document.getElementById("passwordMessage");
    
    if (confirmPassword === "") {
        message.textContent = "";
    } else if (password === confirmPassword) {
        message.textContent = "Passwords match!";
        message.style.color = "green";
    } else {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;
    var message = document.getElementById("passwordMessage");
    
    // At least 8 chars, 1 uppercase, 1 lowercase, and 1 number
    var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (password === "") {
        message.textContent = "";
        return false;
    } else if (strongRegex.test(password)) {
        message.textContent = "Strong password!";
        message.style.color = "green";
        return true;
    } else {
        message.textContent = "Password must be at least 8 characters with uppercase, lowercase, and numbers";
        message.style.color = "red";
        return false;
    }
}

function validateEmail() {
    // Find the email input - it doesn't have an id in your HTML
    var emailInput = document.querySelector('input[name="Email"]');
    if (!emailInput) return true; // Skip if not found
    
    var email = emailInput.value;
    
    var messageId = "emailMessage";
    var messageElement = document.getElementById(messageId);
    
    if (!messageElement) {
        messageElement = document.createElement("span");
        messageElement.id = messageId;
        emailInput.parentNode.appendChild(document.createElement("br"));
        emailInput.parentNode.appendChild(messageElement);
    }
    
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (email === "") {
        messageElement.textContent = "";
        return false;
    } else if (emailRegex.test(email)) {
        messageElement.textContent = "Valid email format";
        messageElement.style.color = "green";
        return true;
    } else {
        messageElement.textContent = "Invalid email format";
        messageElement.style.color = "red";
        return false;
    }
}

function checkfirstname() {
    var firstname = document.querySelector('input[name="firstname"]');
    if (firstname) {
        // Basic validation - you can customize this further
        if (firstname.value.trim() === '') {
            firstname.setCustomValidity('First name cannot be empty');
        } else if (!/^[A-Za-z\s'-]+$/.test(firstname.value)) {
            firstname.setCustomValidity('First name can only contain letters, spaces, apostrophes, and hyphens');
        } else {
            firstname.setCustomValidity('');
        }
    }
}

function checkmiddle() {
    var middleinitial = document.querySelector('input[name="middleinitial"]');
    if (middleinitial) {
        // Basic validation for middle initial
        if (middleinitial.value.trim() !== '' && !/^[A-Za-z]$/.test(middleinitial.value)) {
            middleinitial.setCustomValidity('Middle initial must be a single letter');
        } else {
            middleinitial.setCustomValidity('');
        }
    }
}



document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("myForm");
    var passwordField = document.getElementById("password");
    var confirmPasswordField = document.getElementById("confirmPassword");
    var emailField = document.querySelector('input[name="Email"]');
    
    if (passwordField) {
        passwordField.addEventListener("input", function() {
            validatePassword();
            if (confirmPasswordField && confirmPasswordField.value !== "") {
                checkMatch();
            }
        });
    }
    
    if (confirmPasswordField) {
        confirmPasswordField.addEventListener("input", checkMatch);
    }
    
    if (emailField) {
        emailField.addEventListener("input", validateEmail);
    }
    
    if (form) {
        form.addEventListener("submit", function(event) {
            var isValid = true;
            
            if (emailField && !validateEmail()) {
                isValid = false;
                alert("Please enter a valid email address");
            }
            
            if (passwordField && passwordField.value !== "" && !validatePassword()) {
                isValid = false;
                alert("Please create a stronger password");
            }
            
            if (passwordField && confirmPasswordField && 
                passwordField.value !== "" && 
                passwordField.value !== confirmPasswordField.value) {
                isValid = false;
                alert("Passwords do not match");
            }
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var passwordField = document.getElementById("password");
    var checklist = document.getElementById("passwordChecklist");
    
    var lengthCheck = document.getElementById("lengthCheck");
    var uppercaseCheck = document.getElementById("uppercaseCheck");
    var lowercaseCheck = document.getElementById("lowercaseCheck");
    var numberCheck = document.getElementById("numberCheck");

    passwordField.addEventListener("focus", function() {
        checklist.style.display = "block"; // Shows up as the checklist when user focuses on the pasword box not the confirm password
    });

    passwordField.addEventListener("blur", function() {
        if (passwordField.value === "") {
            checklist.style.display = "none"; // Hides it if password field is empty
        }
    });

    passwordField.addEventListener("input", function() {
        var password = passwordField.value;

        // Check password conditions dynamically
        lengthCheck.style.color = password.length >= 8 ? "green" : "red";
        uppercaseCheck.style.color = /[A-Z]/.test(password) ? "green" : "red";
        lowercaseCheck.style.color = /[a-z]/.test(password) ? "green" : "red";
        numberCheck.style.color = /\d/.test(password) ? "green" : "red";
    });
});

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


  function getdata1() {
    console.log("Get Data button clicked!"); 

    var formcontents = document.getElementById("myForm");
    
    // Declare formoutput with var, let, or const to ensure it's defined
    var formoutput = "<table border='1'><tr><th>Name of Data</th><th>Type</th><th>Current Value</th></tr>"; 
    
    var datatype;
    var i;

    // Ensure formcontents exists before proceeding
    if (!formcontents) {
        console.error("Form not found!");
        return;
    }

    // Loop through form contents
    for (i = 0; i < formcontents.elements.length; i++) {
        console.log("item: "+i+" "+formcontents.elements[i].name+" = "+formcontents.elements[i].value);

        // If input has value (and it's not empty)
        if (formcontents.elements[i].value !== "") {
            datatype = formcontents.elements[i].type;

            // Build the table based on element types
            switch (datatype) {
                case "checkbox":
                    if (formcontents.elements[i].checked) {
                        formoutput += "<tr><td>" + formcontents.elements[i].name + "</td>";
                        formoutput += "<td>" + datatype + "</td>";
                        formoutput += "<td>Checked</td></tr>";
                    }
                    break;
                case "radio":
                    if (formcontents.elements[i].checked) {
                        formoutput += "<tr><td>" + formcontents.elements[i].name + "</td>";
                        formoutput += "<td>" + datatype + "</td>";
                        formoutput += "<td>" + formcontents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "button":
                case "submit":
                case "reset":     
                break;
                
                default:
                    formoutput += "<tr><td>" + formcontents.elements[i].name + "</td>";
                    formoutput += "<td>" + datatype + "</td>";
                    formoutput += "<td>" + formcontents.elements[i].value + "</td></tr>";
            }
        }
    }

    // Close the table
    formoutput += "</table>";

    // Find the output div
    var outputDiv = document.getElementById("outputformdata");
    
    // Ensure output div exists before setting innerHTML
    if (outputDiv) {
        outputDiv.innerHTML = formoutput;
    } else {
        console.error("Output div not found!");
    }
}

// Ensure the function is added to the global scope
window.getdata1 = getdata1;

// Add event listener to ensure the function works
document.addEventListener("DOMContentLoaded", function() {
    var getDataButton = document.getElementById("getdata");
    if (getDataButton) {
        getDataButton.addEventListener("click", getdata1);
    } else {
        console.error("Get Data button not found!");
    }
});