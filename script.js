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
    } else if (addOperandToScreen(calculatorOutputText, userInput, operands)) {
      calculatorOutputText += " " + userInput.toString();
    } else if (userInput === "clear") {
      calculatorOutputText = "";
    } else {
      // Not sure if I need more validation. Test and see if I cover all
      // the test cases
      let result = (calculatorOutput.textContent = calculateResult(
        calculatorOutput.textContent,
        operands,
      ));
      if (userInput !== "=") {
        calculatorOutputText = `${result} ${userInput}`;
      } else {
        calculatorOutputText = `${result}`;
      }
    }
    calculatorOutput.textContent = calculatorOutputText;
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
      return result;
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
