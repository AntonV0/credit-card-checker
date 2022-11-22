// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Function using the Luhn algorithm
const validateCred = arr16Digit => {
  let reversedDigits = [];

  // Removing the last digit of each array (without mutating original array)
  arr15Digit = arr16Digit.slice(0, 15);
  // console.log(`The 16-digit card number is: ${arr16Digit.join("")}.`); // To check that original array did not mutate
  // console.log(`The 15-digit card number is: ${arr15Digit.join("")}.`); // To check that new array is 15 digits long, with last digit removed

  // Reverse iteration FOR loop
  for (let i = arr15Digit.length - 1; i >= 0; i--) {
    // Doubles each odd-iterated digit (if doubled total is equal to or lower than 9)
    if (i % 2 === 0 && (arr15Digit[i] * 2) <= 9) {
      reversedDigits.push(arr15Digit[i] * 2);
    // Doubles each odd-iterated digit and subtracts 9 (if doubled total is higher than 9)
    } else if (i % 2 === 0 && (arr15Digit[i] * 2) > 9) {
      reversedDigits.push((arr15Digit[i] * 2) - 9);
    // This is for the rest of the digits that are not doubled (i.e. 2nd, 4th, 6th... digits of the 15-digit number)
    } else {
      reversedDigits.push(arr15Digit[i]);
    }
  }
  // console.log(reversedDigits); // To check that the 15-digit number is reversed 

  // Sum of reversed digits, including doubled digits and the final digit
  const sumOf15Digits = reversedDigits.reduce((accumulator, currentValue) => accumulator + currentValue);
  const sumOf16Digits = sumOf15Digits + arr16Digit[15];
  if (sumOf16Digits % 10 === 0) {
    return true;
  } else {
    return false;
  }    
  return reversedDigits; // console.log wouldn't work without this
};

// Initiating the validateCred function
// console.log(validateCred(valid1)); 
// console.log(validateCred(invalid1));

// Function finding invalid cards from the batch array
const findInvalidCards = nestedArr => {
  const invalidArr = [];
  for (let i = 0; i < nestedArr.length; i++) {
    validateCred(nestedArr[i]);
    if (validateCred(nestedArr[i]) === false) {
      invalidArr.push(nestedArr[i]);
    }
  }
  return invalidArr;
};

console.log(findInvalidCards(batch));
/* Output:
[ [ 3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6 ],
  [ 4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5 ],
  [ 5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3 ],
  [ 3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4 ],
  [ 6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5 ],
  [ 5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4 ],
  [ 3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4 ],
  [ 4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3 ] ]
*/

// Function identifying cred card companies that have issued faulty numbers
const idInvalidCardCompanies = nestedArr => {
  const cardCompany = [];
  for (let i = 0; i < nestedArr.length; i++) {
    if (nestedArr[i][0] === 3) {
      if (cardCompany.indexOf('Amex') === -1) {
        cardCompany.push('Amex');
      }
    } else if (nestedArr[i][0] === 4) {
      if (cardCompany.indexOf('Visa') === -1) {
        cardCompany.push('Visa');
      }
    } else if (nestedArr[i][0] === 5) {
      if (cardCompany.indexOf('Mastercard') === -1) {
        cardCompany.push('Mastercard');
      }
    } else if (nestedArr[i][0] === 6) {
     if (cardCompany.indexOf('Discover') === -1) {
        cardCompany.push('Discover');
      }
    } else {
      if (cardCompany.indexOf('Company not found') === -1) {
        cardCompany.push('Company not found');
      }
    } 
  } return cardCompany;
}

console.log(idInvalidCardCompanies(batch));
// [ 'Visa', 'Mastercard', 'Amex', 'Discover' ]