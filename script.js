function main() {
  const operands = ["+", "-", "*", "/"];
  console.log("Starting Program");
  let calculatorOutput = document.querySelector(".calculator-output");
  const btnContainer = document.querySelector(".calculator-buttons");
  const equalButton = document.querySelector(".equal");
  // Probably a good idea to separate into a named function
  //
  // Adds User Input
  btnContainer.addEventListener("click", (e) => {
    let userInput = e.target.value;
    let calculatorOutputText = calculatorOutput.textContent;
    if (!Number.isNaN(+userInput)) {
      if (
        userInput.length > 0 &&
        operands.includes(calculatorOutputText.at(-1))
      ) {
        calculatorOutputText += " ";
      }
      calculatorOutputText += userInput;
    } else {
      if (validateOperand(calculatorOutputText, userInput, operands)) {
        calculatorOutputText += " " + userInput.toString();
      } else if (userInput === "clear") {
        calculatorOutputText = "";
      }
    }
    calculatorOutput.textContent = calculatorOutputText;
  });

  // Calculate Result
  equalButton.addEventListener("click", (e) =>
    calculateResult(calculatorOutput),
  );
}

function calculateResult(calculatorScreenOutput, operands) {
  const operand = calculatorScreenOutput.find((char) =>
    operands.includes(char),
  );
  if (!(operand === undefined)) {
    const parts = calculatorScreenOutput.split(operand);
    const result = operator(
      parts[1],
      Number.parseInt(operand(0)),
      Number.parseInt(operand(1)),
    );
    console.log(`Result: ${result}`);
  }
}

function validateOperand(currentScreen, userInput, operand) {
  if (!operand.includes(userInput)) {
    return false;
  }
  if (currentScreen.length === 0) {
    return false;
  }

  // Ensure there cannot exist duplicate operands
  if (currentScreen.split("").some((char) => operand.includes(char))) {
    return false;
  }
  return true;
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
