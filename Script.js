const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll(".button-operator");
const historyButton = document.querySelector(".history");
const historyBox = document.querySelector(".history-box");
const historyList = document.getElementById("historyList");
let history = [];

// Event listener for button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    // Clear the input box when "Clear" button is clicked
    if (buttonText === "Clear") {
      inputBox.value = "";
    }

    // Delete last character when "Delete" button is clicked
    else if (buttonText === "Delete") {
      inputBox.value = inputBox.value.slice(0, -1);
    }

    // Handle percentage and operations
    else if (buttonText === "%") {
      inputBox.value = parseFloat(inputBox.value) / 100;
    }

    // Perform calculation when "Equal" button is clicked
    else if (buttonText === "Equal") {
      try {
        const expression = inputBox.value;  // Store the expression before evaluating
        const result = eval(expression);    // Evaluate the expression
        inputBox.value = result;
        // Add both the expression and the result to history
        history.push(`${expression} = ${result}`);
        updateHistory();
      } catch (error) {
        inputBox.value = "Error";
      }
    }

    // Regular number and operator buttons
    else {
      inputBox.value += buttonText;
    }
  });
});

// Show history when the history button is clicked
historyButton.addEventListener("click", () => {
    const currentDisplay = window.getComputedStyle(historyBox).display;
    historyBox.style.display = currentDisplay === "none" ? "block" : "none";
  });
  
// updateHistory();
function updateHistory() {
    if (!historyList) {
      console.error("History list element is missing.");
      return;
    }
  
    // Clear the current list
    historyList.innerHTML = "";
  
    // If history is empty, show a message (optional)
    if (history.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No history available";
      historyList.appendChild(li);
    } else {
      // Add each entry to the history list
      history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;  // Display each history entry
        historyList.appendChild(li);
      });
    }
  } 