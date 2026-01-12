function main() {
  console.log("Starting Program");
}

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(numerator, denominator) {
  return numerator / denominator;
}

function operator(operation, number1, number2) {
  if (operation === "+") {
    return add(number1, number2);
  } else if (operation === "-") {
    return subtract(number1, number2);
  } else if (operation === "*") {
    return multiply(number1, number2);
  } else if (operation === "/") {
    return divide(number1, number2);
  }
  // Not covered error handling yet. This may be ok for now!
  console.log(`Invalid Operation Selected`);
}

main();
