function calculate() {
    try {
        const firstNumber = parseFloat(
            document.getElementById('firstNumber').value
        );
        const secondNumber = parseFloat(
            document.getElementById('secondNumber').value
        );
        const operation = document.getElementById('operation').value;

        throwIfNaN(firstNumber, secondNumber);

        const result = calcResult(operation, firstNumber, secondNumber);

        addResultToHistory(firstNumber, operation, secondNumber, result);
    } catch (error) {
        alert(error.message);
    }
}

function throwIfNaN(firstNumber, secondNumber) {
    if (isNaN(firstNumber)) {
        throw new Error('Ошибка: введите первое число.');
    }
    if (isNaN(secondNumber)) {
        throw new Error('Ошибка: введите второе число.');
    }
}

function calcResult(operation, firstNumber, secondNumber) {
    switch (operation) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            if (secondNumber === 0) {
                throw new Error('Ошибка: деление на ноль запрещено.');
            }
            return (firstNumber / secondNumber).toFixed(2);
    }
    throw new Error('Ошибка: Неизвестная операция.');
}

function addResultToHistory(firstNumber, operation, secondNumber, result) {
    const outputHistory = document.getElementById('outputHistory');

    const newHistoryItem = document.createElement('div');
    newHistoryItem.className = 'output-history__item output-history__item-last';
    newHistoryItem.innerHTML = `${firstNumber} ${operation} ${secondNumber} = ${result}`;

    outputHistory.appendChild(newHistoryItem);

    const outputHistoryItems = outputHistory.getElementsByClassName(
        'output-history__item'
    );

    if (outputHistoryItems.length > 4) {
        outputHistory.removeChild(outputHistoryItems[0]);
    }

    for (let i = 0; i < outputHistoryItems.length; i++) {
        if (i === outputHistoryItems.length - 1) {
            outputHistoryItems[i].classList.add('output-history__item-last');
            outputHistoryItems[i].classList.remove('output-history__item-old');
        } else {
            outputHistoryItems[i].classList.add('output-history__item-old');
            outputHistoryItems[i].classList.remove('output-history__item-last');
        }
    }
}
