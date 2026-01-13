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
      calculatorOutput.textContent = calculatorOutputText;
    } else if (operands.includes(userInput)) {
      if (isComputable(calculatorOutput.textContent)) {
        let result = (calculatorOutput.textContent = calculateResult(
          calculatorOutput.textContent,
          operands,
        ));
        calculatorOutput.textContent = `${result} ${userInput}`;
        return;
      } else {
        calculatorOutput.textContent += ` ${userInput}`;
        return;
      }
    } else if (userInput === "clear") {
      calculatorOutput.textContent = "";
      return;
    } else if (userInput === "=") {
      if (isComputable(calculatorOutput.textContent)) {
        let result = (calculatorOutput.textContent = calculateResult(
          calculatorOutput.textContent,
          operands,
        ));
        calculatorOutput.textContent = `${result}`;
        return;
      }
      console.log("Can't think of a case where here is reached!");
    }
  });

  // Calculate Result
  equalButton.addEventListener("click", (e) => {
    let result = calculateResult(calculatorOutput.textContent, operands);
    return result;
  });

  // Struggling with Single Responsibility Principle with event listeners. I want to update the text conten. Howver, I'm not sure where I should be doing it
  // Feel like I shouldn't be doing it in the event listener. Feels like cheeting.
  function calculateResult(calculatorScreenOutput, operands) {
    const screenOutputArray = calculatorScreenOutput.split("");
    const operand = screenOutputArray.find((char) => operands.includes(char));

    // Probably a bit redundant since I just split the array already.
    if (!(operand === undefined)) {
      const parts = calculatorScreenOutput.split(operand);
      const result = operator(
        operand,
        Number.parseInt(parts[0]),
        Number.parseInt(parts[1]),
      );
      return round(result, 2);
    }
  }

  // Don't think this is a well named function but was struggling for names
  function addOperandToScreen(currentScreen, userInput, operand) {
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

  function isComputable(currentScreen) {
    const screenOutputArray = currentScreen.split("");
    const operand = screenOutputArray.find((char) => operands.includes(char));

    if (operand === undefined) {
      return false;
    }

    const parts = currentScreen.split(operand);
    if (parts.length !== 2) {
      return false;
    }
    if (
      Number.isNaN(parseInt(parts.at(0)) || Number.isNaN(parseInt(parts.at(1))))
    ) {
      return false;
    }

    return true;
  }

  function round(number, numberPlaces) {
    let multiplier = 10 ** numberPlaces;
    return Math.round(multiplier * number) / multiplier;
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
}
main();
