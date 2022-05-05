// Assignment code here

// Establishing the meat of the operation, here we will pull in the
// criteria and, based on the input, generate a password following
// the users criteria.
function generatePassword() {

// First, we will set up the arrays that contain the character types
// that might be required. This will include upper case letters, lower
// case letters, numbers 0-9 and special characters

var finalPassword = "";
var passwordInvalid = true;
var minLength = 0;
var maxLength = 0;
var passwordLength = 0;
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var checkedLower = false;
var enforceLower = false;
var passesLower = false;
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var checkedUpper = false;
var enforceUpper = false;
var passesUpper = false;
var specials = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@","[", "]", "^", "_", "`", "{", "|", "}", "~"];
var checkedSpecials = false;
var enforceSpecials = false;
var passesSpecials = false;
var numbers = ["0","1","2","3","4","5","6","7","8","9"];
var checkedNumbers = false;
var enforceNumbers = false;
var passesNumbers = false;
var chosenValues = [];
var invalidRange = true;
var chosenValuesEmpty = true;


// We will ask for criteria and store answers as variables throughout for reference farther down

// Get the length range in while loops so errors can be resolved

while (invalidRange) {

  // Reset the variables for when invalid ranges are given

  minLength = 0;
  maxLength = 0;

  while (128 < minLength || minLength < 8) {
    minLength = prompt("What should the minimum size of the password be? (Must be between 8 and 128)");
    minLength = Number(minLength);
    if (128 < minLength || minLength < 8) {
      alert("Minimum length must be between 8 and 128 characters");
    }
  }

  while (128 < maxLength || maxLength < 8) {
    maxLength = prompt("What should the maximum size of the password be? (Must be between 8 and 128)");
    maxLength = Number(maxLength);
    if (128 < maxLength || maxLength < 8) {
      alert("Maximum length must be between 8 and 128 characters");
    }
  }

  console.log("minLength: " + minLength);
  console.log("maxLength: " + maxLength);

  if (minLength < maxLength) {
    alert("The size range for the password is " + minLength + " - " + maxLength + ".");
    invalidRange = false;
  }
  
  else if (minLength === maxLength) {
    alert("Password will be " + maxLength + " characters long.")
    invalidRange = false;
  }
  
  else {
    alert("Range is invalid, the minimum length cannot be larger than the maximum length. Please try again.");
  }
}

// Determine if lower, upper, special and / or numbers should be included.
// Use a while loop to restart these selections if none of the items are chosen to be included.

// Debated using confirm's instead of prompts but it felt unclear since the only options would be 'ok' and 'cancel'

while (chosenValuesEmpty) {
  var answer = "";

  while (!checkedLower) {
    answer = prompt("Would you like lower case characters to be used and required? ('Yes' or 'No')");
    answer = answer.toUpperCase();

    if (answer == "YES") {
      alert("Lower case characters will be used.")
      checkedLower = true;
      enforceLower = true;
      chosenValuesEmpty = false;
      chosenValues = chosenValues.concat(lowerCase);
    }

    else if (answer == "NO") {
      alert("Lower case characters will not be used.")
      checkedLower = true;
      enforceLower = false;
    } else {
      alert("Please insert a valid response ('Yes' or 'No')")
      checkedLower = false;
    }
  }

  answer = "";
  while (!checkedUpper) {
    answer = prompt("Would you like upper case characters to be used and required? ('Yes' or 'No')");
    answer = answer.toUpperCase();

    if (answer == "YES") {
      alert("Upper case characters will be used.")
      checkedUpper = true;
      enforceUpper = true;
      chosenValuesEmpty = false;
      chosenValues = chosenValues.concat(upperCase);
    }

    else if (answer == "NO") {
      alert("Upper case characters will not be used.")
      checkedUpper = true;
      enforceUpper = false;
    } else {
      alert("Please insert a valid response ('Yes' or 'No')")
      checkedUpper = false;
    }
}

answer = "";
while (!checkedSpecials) {
  answer = prompt("Would you like special characters to be used and required? ('Yes' or 'No')");
  answer = answer.toUpperCase();

  if (answer == "YES") {
    alert("Special characters will be used.")
    checkedSpecials = true;
    enforceSpecials = true;
    chosenValuesEmpty = false;
    chosenValues = chosenValues.concat(specials);
  }

  else if (answer == "NO") {
    alert("Specials case characters will not be used.")
    checkedSpecials = true;
    enforceSpecials = false;
  } else {
    alert("Please insert a valid response ('Yes' or 'No')")
    checkedSpecials = false;
  }
}

answer = "";
while (!checkedNumbers) {
  answer = prompt("Would you like numbers to be used and required? ('Yes' or 'No')");
  answer = answer.toUpperCase();

  if (answer == "YES") {
    alert("Numbers will be used.")
    checkedNumbers = true;
    enforceNumbers = true;
    chosenValuesEmpty = false;
    chosenValues = chosenValues.concat(numbers);
  }

  else if (answer == "NO") {
    alert("Numbers will not be used.")
    checkedNumbers = true;
    enforceNumbers = false;
  } else {
    alert("Please insert a valid response ('Yes' or 'No')")
    checkedNumbers = false;
  }
}


if (chosenValuesEmpty) {
  alert("You must include at least one character type.")
  checkedLower = false;
  checkedUpper = false;
    checkedSpecials = false;
    checkedNumbers = false;
  }
}


// Here the password is generated. To do this, we will use the  
// array that includes all of the required criteria and we will
// use a random number generator to ensure that: (a) the length of the
// password is randomized within the defined range and (b) pull items
// out at random from the array until at least one of each chosen
// type is included.

// I am creating a separate function that returns random numbers in
// a range to reference throughout the following items

if (minLength == maxLength) {
  passwordLength = maxLength;
}
else {
  var difference = maxLength - minLength;
  passwordLength = randomizer(difference) + minLength
}

console.log("Password Length: " + passwordLength);
console.log(chosenValues);

while (passwordInvalid) {

  // Here is where the password is generating, it will re-generate
  // until it passes every if check below. Those checks are only
  // run through for each included type, if the type is not included
  // it automatically passes the check, otherwise every character of
  // the password is checked. If there are no hits, it will fail the
  // final check and the password will have to be generated again.

  finalPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    var char = "";
    var positionInArray = randomizer(chosenValues.length);
    char = chosenValues[positionInArray];
    finalPassword += char;
  }

  console.log(finalPassword);

  if (enforceLower) {
    for (let i = 0; i < lowerCase.length; i++) {
      var containsItem = finalPassword.includes(lowerCase[i]);
      if (containsItem) {
        passesLower = true;
      }
    }
  }
  else {
    passesLower = true;
  }

  console.log("Passes lower case check: " + passesLower);

  if (enforceUpper) {
    for (let i = 0; i < upperCase.length; i++) {
      var containsItem = finalPassword.includes(upperCase[i]);
      if (containsItem) {
        passesUpper = true;
      }
    }
  }
  else {
    passesUpper = true;
  }

  console.log("Passes upper case check: " + passesUpper);
  
  if (enforceSpecials) {
    for (let i = 0; i < specials.length; i++) {
      var containsItem = finalPassword.includes(specials[i]);
      if (containsItem) {
        passesSpecials = true;
      }
    }
  }
  else {
    passesSpecials = true;
  }

  console.log("Passes special characters check: " + passesSpecials);
  
  if (enforceNumbers) {
    for (let i = 0; i < numbers.length; i++) {
      var containsItem = finalPassword.includes(numbers[i]);
      if (containsItem) {
        passesNumbers = true;
      }
    }
  }
  else {
    passesNumbers = true;
  }

  console.log("Passes number check: " + passesNumbers);
  
  if (passesLower && passesUpper && passesSpecials && passesNumbers) {
    passwordInvalid = false;
  }
  else {
    passwordInvalid = true;
    passesLower = false;
    passesUpper = false;
    passesSpecials = false;
    passesNumbers = false;
  }
}

return finalPassword
}

function randomizer(max) {
  return Math.floor(Math.random() * max);
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
