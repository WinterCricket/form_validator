const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//functions

//show failure
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//email is valid

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())){
    showSuccess(input);
    } else{
        showError(input, "Email invalid");
      }
    
 }

//password length valid
function validPassword(password) {
  const pw = /^[A-Za-z]\w{7,14}$/;
  return pw.test(String(password));
}

//check required fields

function checkRequired(inputArray) {
  inputArray.forEach(function(input) {
    if (input.value.trim() === "") {

      showError(input, `${getFieldName(input)} is needed.`);
    } else {
      showSuccess(input);
    }
  });
}

//checkLength
function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} must be at least ${min} digits long.`);
  } else if(input.value.length > max){
    showError(input, `${getFieldName(input)} must be less than ${max + 1} digits long.`);
  } else {
    showSuccess(input);
  }
}

//getFieldName
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//checkMatch
function checkMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, "Passwords mismatch!");
  } else {
    showSuccess(input2);
  }
}

//Event listeners
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkMatch(password, password2);
});
