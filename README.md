# Credit Card Checker
## Project #33 from Codecademy's Full Stack Engineer Career Path
### By Anton Vlasenko (AntonV0)  
## Project Outline
This JavaScript project checks the validity of credit card numbers using the Luhn algorithm. Invalid card number arrays are logged, as well as the companies these cards are from. Here is how the algorithm works:
1. Starting from the farthest digit from the right (the check digit), iterate to the left
2. As you iterate to the left, every other digit is doubled (apart from the check digit)
3. If the number is greater than 9 after doubling, subtract 9 from its value
4. Sum up all the digits in the credit card number
5. If the sum modulo 10 is 0 (if the sum divided by 10 has a remainer of 0), then the number is valid

The first digit of credit card numbers represents the company its from. This information was used to identify and display the companies of the invalid card numbers, without repeating the company's name multiple times. 
## What I Learned
  - How to implement an algorithm in JavaScript that loops through arrays
***
*Please note that in each project, the first commit is always the starter code provided by Codecademy.*
