class Calculator {
    elePreviousPreview;
    eleCurrentPreview;
    previousOperand = ""
    currentOpenrand = ""

    constructor(elePreviousPreview, eleCurrentPreview) {
        this.elePreviousPreview = elePreviousPreview
        this.eleCurrentPreview = eleCurrentPreview
    }

    onPressNumber(number) {
        //console.log("this.eleCurrentPreview", this.eleCurrentPreview)
        if (number === ".") {
            if (            
                this.eleCurrentPreview.textContent.length < 1 ||
                this.eleCurrentPreview.textContent.includes(".")
            ) {
                return
            }
        }

        this.eleCurrentPreview.textContent += number
    }

    appendOperation(operation) {
        // console.log(
        //   "this.eleCurrentPreview.textContent: ",
        //   this.eleCurrentPreview.textContent
        // );
        // console.log(
        //   "this.elePreviousPreview.textContent: ",
        //   this.elePreviousPreview.textContent
        // );
        if (
          (this.eleCurrentPreview.textContent.length < 1 &&
            this.previousOperand.length > 0) ||
          (this.eleCurrentPreview.textContent.length > 0 &&
            this.elePreviousPreview.textContent.length < 1)
        ) {
          if (this.previousOperand.length > 0) {
            // 이미 계산 기호 존재시, 초기화
            this.elePreviousPreview.textContent =
              this.elePreviousPreview.textContent.split(" ")[0];
          }
          this.previousOperand = operation;
          this.elePreviousPreview.textContent +=
            this.eleCurrentPreview.textContent + " " + operation;
          this.eleCurrentPreview.textContent = "";
        }
    }
}

/*
* 단일 선택 
*/
// 값 표시
const elePreviousPreview = document.querySelector("[data-previous-preview]")
const eleCurrentPreview = document.querySelector("[data-current-preview]")

// 사칙연산
const eleMinus = document.querySelector("[data-btn-minus]")
const elePlus = document.querySelector("[data-btn-plus]")
const eleMultiply = document.querySelector("[data-btn-multiply]")
const eleDivide = document.querySelector("[data-btn-divide]")

const eleReset = document.querySelector("[data-btn-reset]")
const eleDelete = document.querySelector("[data-btn-delete]")
const eleEqual = document.querySelector("[data-btn-Equal]")

/* 
* 다중 선택 
*/
const eleNumbers = document.querySelectorAll("[data-btn-number]")
const eleOperations = document.querySelectorAll("[data-btn-operation]")



const calculator = new Calculator(elePreviousPreview, eleCurrentPreview);

eleNumbers.forEach((eleNumber) => {
    eleNumber.addEventListener("click", (e) => {
        const number = e.target.textContent
        //console.log({number})
        calculator.onPressNumber(number)
    })
})

eleOperations.forEach((eleOperation) => {
    eleOperation.addEventListener("click", (e) => {
        console.log("eleOperation", eleOperation)
        switch (eleOperation) {
            case eleMinus:
                calculator.appendOperation("-")
                break
            case elePlus:
                calculator.appendOperation("+")
                break
            case eleMultiply:
                calculator.appendOperation("*")
                break
            case eleDivide:
                calculator.appendOperation("÷")
                break
            case eleEqual:
                break    
            default:
                break
        }
    })
})