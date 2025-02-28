const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;
    key.addEventListener('click', () => {
        if (value == "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            displayInput.innerHTML = cleanInput(input);
        } else if (value == "=") {
            let result = eval(prepareInput(input));
            displayOutput.innerHTML = cleanOutput(result);
        } else if (value == "brackets") {
            if (
                input.indexOf("(") == -1 || (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))
            ) {
                input += "(";
            } else if (
                input.indexOf("(") != -1 && input.indexOf(")") == -1 ||
                (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))
            ) {
                input += ")";
            }
            displayInput.innerHTML = cleanInput(input);
        } else {
            if (validateInput(value)) {
                if (input === "0" && !isNaN(value)) {
                    input = value;
                } else {
                    input += value;
                }
                displayInput.innerHTML = cleanInput(input);
            }
        }
    });
}

function cleanInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for (let i = 0; i < inputArrayLength; i++) {
        if (inputArray[i] == "*") {
            inputArray[i] = '<span class="operator"> x </span>';
        } else if (inputArray[i] == "/") {
            inputArray[i] = '<span class="operator"> / </span>';
        } else if (inputArray[i] == "+") {
            inputArray[i] = '<span class="operator"> + </span>';
        } else if (inputArray[i] == "-") {
            inputArray[i] = '<span class="operator"> - </span>';
        } else if (inputArray[i] == "(") {
            inputArray[i] = '<span class="bracket"> ( </span>';
        } else if (inputArray[i] == ")") {
            inputArray[i] = '<span class="bracket"> ) </span>';
        } else if (inputArray[i] == "%") {
            inputArray[i] = '<span class="operator"> % </span>';
        }
    }
    return inputArray.join("");
}

function cleanOutput(output) {
    let outputString = output.toString();
    
    if (outputString.includes(".")) {
        outputString = parseFloat(output).toFixed(7); // Maksimal 7 angka desimal
        outputString = outputString.replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1"); // Hapus nol berlebih
    }
    
    return outputString;
}

function validateInput(value) {
    let lastInput = input.slice(-1);
    let operators = ["+", "-", "*", "/"];

    if (value == "." && lastInput == ".") {
        return false;
    }
    if (operators.includes(value)) {
        if (operators.includes(lastInput)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function prepareInput(input) {
    let inputArray = input.split("");
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == "%") {
            inputArray[i] = "/100";
        }
    }
    return inputArray.join("");
}