class CheckCardNumber {
    constructor() {
        this.cardNumber = document.querySelector('[name="card-number"]');
        this.resultContainer = document.querySelector('h2');
        this.cardTypes = [
            {
                name: 'Mastercard',
                numberLength: [16],
                startNum: /[22,5][1-5]/
            }, {
                name: 'Visa',
                numberLength: [16, 13],
                startNum: /4[0-9]/
            }, {
                name: 'American Express',
                numberLength: [15],
                startNum: /3[4,7]/
            }, {
                name: 'Discover',
                numberLength: [16],
                startNum: /60/
            }, {
                name: 'JCB',
                numberLength: [16],
                startNum: /35/
            }, {
                name: 'Diners Club',
                numberLength: [14],
                startNum: /30/
            }
        ]
    }
    validator() {

        const isNumber = (/^\d+$/).test(this.cardNumber.value);
        if (this.cardNumber.value.length < 13) {
            return alert('Wprowadzony numer jest za krótki')
        } else if (this.cardNumber.value.length > 16) {
            return alert('Wprowadzony numer jest za długi')
        } else if (isNumber) {
            return this.assignCard();
        } else {
            return alert('Proszę wprowadzić prawidłowe dane')
        }
    }

    assignCard({cardNumber, cardTypes} = this) {
        let type = false;
        cardTypes.map((el) => {

            if (el.startNum.test(cardNumber.value.substring(0, 2)) && el.numberLength.includes(cardNumber.value.length)) {
                type = true;
                return this.checkNumber(name = el.name)
            }
        })
        if (type === false) 
            return alert('Pdany numer nie jest zgodny z bazą dostawców')
    }

    checkNumber(name) {
        let multiNums = '';
        let normalNums = [];
        let multiSum = 0;
        let normSum = 0;

        //Division or multiply and do not multiply the number
        this
            .cardNumber
            .value
            .split('')
            .reverse()
            .map(
                (el, index) => (index % 2 !== 0)
                    ? (multiNums += el * 2)
                    : normalNums.push(el)
            )

        //Sum of multiplied numbers
        multiNums
            .split('')
            .map((el) => multiSum += Number(el));

        //Sum of not multiplied numbers
        normalNums.map((el) => normSum += Number(el));

        if ((multiSum + normSum) % 10 === 0) {
            return this.resultContainer.textContent = `Wprowadzony numer karty jest poprawny, wydał ją: ${name}`;
        } else 
            return this.resultContainer.textContent = `Wprowadzony numer karty jest niepoprawny!`;
        }
    
    showInfo(e) {
        this.resultContainer.textContent = '';
        e.preventDefault();
        this.validator();
        this.cardNumber.value = '';
    }

}

export {CheckCardNumber}