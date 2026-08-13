// =============================================================================
// PROGRAMMING FUNDAMENTALS - Assignment 9: Simple Calculator
// =============================================================================

const readlineSync = require("readline-sync");

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function modulus(firstNumber, secondNumber) {
  return firstNumber % secondNumber;
}

function exponentiate(firstNumber, secondNumber) {
  return firstNumber ** secondNumber;
}

function displayMenu() {
  console.log("\n============================");
  console.log("     SIMPLE CALCULATOR");
  console.log("============================");
  console.log("1. Addition");
  console.log("2. Subtraction");
  console.log("3. Multiplication");
  console.log("4. Division");
  console.log("5. Modulus");
  console.log("6. Exponentiation");
  console.log("7. Quit");
}

function readNumber(prompt) {
  const number = Number(readlineSync.question(prompt).trim());
  return Number.isFinite(number) ? number : null;
}

function runCalculator() {
  const operations = {
    1: { symbol: "+", calculate: add },
    2: { symbol: "-", calculate: subtract },
    3: { symbol: "*", calculate: multiply },
    4: { symbol: "/", calculate: divide },
    5: { symbol: "%", calculate: modulus },
    6: { symbol: "**", calculate: exponentiate },
  };

  let isRunning = true;

  while (isRunning) {
    displayMenu();
    const choice = readlineSync.question("Select an operation (1-7): ").trim();

    if (choice === "7") {
      console.log("Goodbye!");
      isRunning = false;
      continue;
    }

    const operation = operations[choice];
    if (!operation) {
      console.log("Invalid choice. Please select a number from 1 to 7.");
      continue;
    }

    const firstNumber = readNumber("Enter first number : ");
    const secondNumber = readNumber("Enter second number: ");

    if (firstNumber === null || secondNumber === null) {
      console.log("Error: Please enter valid numbers.");
      continue;
    }

    if ((choice === "4" || choice === "5") && secondNumber === 0) {
      console.log(choice === "4" ? "Error: Cannot divide by zero." : "Error: Cannot calculate modulus by zero.");
      continue;
    }

    const result = operation.calculate(firstNumber, secondNumber);
    console.log(`Result: ${firstNumber} ${operation.symbol} ${secondNumber} = ${result.toFixed(2)}`);
  }
}

runCalculator();