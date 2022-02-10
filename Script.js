let firstNum = [0];
document.getElementById("input").value = firstNum.join("");
let secondNum = [0];
let operators = ['+', '-', '*', '/', "="];
let operator;
let lastChange = "";
let myResult;

document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keyup', (event) => {
        let value = event.target.key;
        if (typeof value === 'number') {
            insert(value);
        }
        if (event.key === "Enter") {
            calculate();
        }
    }, false);
});

function insert(val) {
    if (lastChange === "calculated") {
        updateOutput("clear");
        lastChange = "";
    }
    if (firstNum.length === 1 && firstNum[0] === 0 && val !== '.') {
        firstNum.pop();
    }
    if (val === '.' && firstNum.includes('.')) {
        return;
    }
    if (operator === undefined) {
        firstNum.push(val);
        document.getElementById("input").value = firstNum.join("");
    } else {
        if (secondNum.length === 1 && secondNum[0] === 0 && val !== '.') {
            secondNum.pop();
        }
        secondNum.push(val);
        document.getElementById("input").value = secondNum.join("");
    }
}


function operation(operVal) {
    if (document.getElementById("input").value == myResult && lastChange === "calculated") {
        let resultStringed = myResult.toString();
        let resultArray = resultStringed.split("");
        console.log(resultArray);
        lastChange = "";
        for (let i = 0; i <= resultStringed.length; i++) {
            firstNum.push(myResult.toString().split("")[i]);
        }
    }
    operator = operVal;
    updateOutput("operation")
}

function updateOutput(settings) {
    if (settings === "operation") {
        document.getElementById("output-text").innerText = firstNum.join("") + " " + operator;

    } else if (settings === "clear") {
        document.getElementById("output-text").innerText = "";
    } else {
        document.getElementById("output-text").innerText = firstNum.join("") + " " + operator + " " + secondNum.join("") + " =";
    }

}

function remove() {
    if (operator === undefined) {
        variableRemover(firstNum);
    } else {
        variableRemover(secondNum);
    }

    function variableRemover(currArr) {
        if (currArr.length === 1) {
            currArr.pop();
            currArr.push(0);
            document.getElementById("input").value = currArr.join("");
        } else {
            currArr.pop();
            document.getElementById("input").value = currArr.join("");
        }
    }

}

function calculate() {
    if (operator === undefined) {
        operation("=");
    }
    myResult = eval(firstNum.join("") + operator + secondNum.join(""));
    lastChange = "calculated";
    document.getElementById("input").value = myResult;
    updateOutput("result");
    firstNum = [];
    secondNum = [];
    operator = undefined;
}

function cleanCalc() {
    firstNum = [];
    secondNum = [];
    operator = undefined;
    document.getElementById("input").value = "";
    document.getElementById("output-text").innerText = "";
}