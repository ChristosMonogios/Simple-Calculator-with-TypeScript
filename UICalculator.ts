﻿/// <reference path="IUICalculator.ts" />

module Calculator {
    export class UICalculator implements IUICalculator {
        private element: HTMLElement;
        private operation: IOperation;
        private _operationIcons: { [name: string]: string } = {
            "addition": "+",
            "subtraction": "-",
            "multiplication": "*",
            "division": "/"
        }

        constructor(element: HTMLElement, operation: IOperation) {
            this.element = element;
            this.operation = operation;
            this.createInputArea("CalcInput");
            this.createButton("addition", "+", this.operationOnClick);
            this.createButton("subtraction", "-", this.operationOnClick);
            this.createButton("multiplication", "*", this.operationOnClick);
            this.createButton("division", "/", this.operationOnClick);
        }

        createInputArea = (id: string): void => {
            var inputEl = document.createElement('input');
            inputEl.id = id;
            this.element.appendChild(inputEl);
        }

        createButton = (id: string, text: string, callback): void => {
            var buttonEl = document.createElement('button');
            buttonEl.id = id;
            buttonEl.name = id;
            buttonEl.innerHTML = text;

            buttonEl.addEventListener("click", callback, false);
            this.element.appendChild(buttonEl);
        }

        calculateOperation = (firstOperand: number, secondOperand: number, operation: string): number => {
            var result: number = 0;
            switch (operation) {
                case "addition":
                    result = this.operation.addition(firstOperand, secondOperand);
                    break;
                case "subtraction":
                    result = this.operation.subtraction(firstOperand, secondOperand);
                    break;
                case "multiplication":
                    result = this.operation.multiplication(firstOperand, secondOperand);
                    break;
                case "division":
                    result = this.operation.division(firstOperand, secondOperand);
                    break;
            }

            return result;
        }

        operationOnClick = (e): void => {
            this.getInputValues(e.target.name);
        }

        getInputValues = (operation): void => {
            var valueFromMemory = parseInt((<HTMLInputElement>document.getElementById("memory")).innerHTML);
            var currentInput = parseInt((<HTMLInputElement>document.getElementById("CalcInput")).value);

            if (currentInput)

            if (!isNaN(valueFromMemory)) {
                var result = this.calculateOperation(valueFromMemory, currentInput, operation);
                document.getElementById("memory").innerHTML = "" + result;
            } else {
                document.getElementById("memory").innerHTML = "" + currentInput;
            }

            var inputElement = <HTMLInputElement>document.getElementById('CalcInput');
            inputElement.value = "";
            document.getElementById("operationSymbol").innerHTML = this._operationIcons[operation];
        }
    }
}