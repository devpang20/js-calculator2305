class Calculator {
    elePreviousPreview
    eleCurrentPreview
    previousOperand = ""
    currentOpenrand = ""

    constructor(elePreviousPreview, eleCurrentPreview) {
        this.elePreviousPreview = elePreviousPreview
        this.eleCurrentPreview = eleCurrentPreview
    }

    // 숫자 처리
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

    // 합계
    onEqual() {
        // 모든 값이 들어왔는 검사
        if (
            this.eleCurrentPreview.textContent.length > 0 &&
            this.elePreviousPreview.textContent.length > 0 &&
            this.previousOperand.length > 0
        ) {
            let result = 0

            switch (this.previousOperand) {
                case "-":
                    result = this.handleMinus()
                    break
                case "+":
                    result = this.handlePlus()
                    break
                case "*":
                    result = this.handleMultiply()
                    break
                case "÷":
                    result = this.handleDivide()
                    break 
                default:
                    break
            }
            // 결과 출력
            this.eleCurrentPreview.textContent = result.toString()
            this.currentOpenrand = ""
            this.elePreviousPreview.textContent = ""
        }
    }
    
    onReset() {
        this.elePreviousPreview.textContent = ""
        this.eleCurrentPreview.textContent = ""
        this.previousOperand = ""
        this.currentOpenrand = ""
    }


    handlePlus() {
        return (
            +this.elePreviousPreview.textContent.split(" ")[0] + 
            +this.eleCurrentPreview.textContent
        )
    }

    handleMinus() {
        return (
            +this.elePreviousPreview.textContent.split(" ")[0] - 
            +this.eleCurrentPreview.textContent
        )
    }

    handleMultiply() {
        return (
            +this.elePreviousPreview.textContent.split(" ")[0] * 
            +this.eleCurrentPreview.textContent
        )
    }

    handleDivide() {
        return (
            +this.elePreviousPreview.textContent.split(" ")[0] / 
            +this.eleCurrentPreview.textContent
        )
    }


    // 사칙연산 처리
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
const eleEqual = document.querySelector("[data-btn-Equal]")

const eleReset = document.querySelector("[data-btn-reset]")
const eleDelete = document.querySelector("[data-btn-delete]")


/* 
* 다중 선택 
*/
const eleNumbers = document.querySelectorAll("[data-btn-number]")
const eleOperations = document.querySelectorAll("[data-btn-operation]")

const calculator = new Calculator(elePreviousPreview, eleCurrentPreview);

// 숫자 처리
eleNumbers.forEach((eleNumber) => {
    eleNumber.addEventListener("click", (e) => {
        const number = e.target.textContent
        //console.log({number})
        calculator.onPressNumber(number)
    })
})

// 연산처리
eleOperations.forEach((eleOperation) => {
    eleOperation.addEventListener("click", (e) => {
        //console.log("eleOperation", eleOperation)
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
                calculator.onEqual()
                break    
            default:
                break
        }
    })
})

eleReset.addEventListener("click", (e) => calculator.onReset())
eleDelete.addEventListener("click", (e) => calculator.onDelete())