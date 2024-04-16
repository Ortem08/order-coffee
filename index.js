let formsCount = 1;
document.querySelector(".add-button").addEventListener("click", () => {
    formsCount++;
    let allForms = document.querySelectorAll(".beverage");
    let newForm = allForms[allForms.length - 1].cloneNode(true);
    newForm.querySelector("h4").innerHTML = `Напиток №${formsCount}`;

    for (let radio of newForm.querySelectorAll("input[type=radio]")) {
        radio.name = "milk" + formsCount;
    }

    newForm.querySelector('.userText').value = '';
    newForm.querySelector('input[type="radio"][value="usual"]').checked = true;
    newForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    let removeButton = newForm.querySelector(".removeButton");
    removeButton.addEventListener("click", () => {
        if (formsCount > 1){
            newForm.remove();
            formsCount--;
        }
    });
    allForms[allForms.length - 1].after(newForm);
});

document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    openModalWindow();
});

function openModalWindow() {
    document.querySelector('.overlay').style.visibility = 'visible';
    document.querySelector('.orderStatus').textContent = getOrderStatus();
    fillModalTable()
}

document.querySelector('.closeModalWindow').addEventListener('click', () => {
    closeModalWindow();
});

function closeModalWindow() {
    document.querySelector('.overlay').style.visibility = 'hidden';
}

function getOrderStatus() {
    if ([2, 3, 4].includes(formsCount % 10) && Math.floor(formsCount % 100 / 10) !== 1) {
        return `Заказ принят! Вы заказали ${formsCount} напитка`;
    } else if (formsCount % 10 == 1 && Math.floor(formsCount % 100 / 10) !== 1){
        return `Заказ принят! Вы заказали ${formsCount} напиток`;
    } else {
        return `Заказ принят! Вы заказали ${formsCount} напитков`;
    }
}

let dict = {
    'usual' : 'Обычное',
    'no-fat' : 'Обезжиренное',
    'soy' : 'Соевое',
    'coconut' : 'Кокосовое',
    'espresso': 'Эспрессо',
    'capuccino': 'Капучино',
    'cacao': 'Какао'
}

function fillModalTable() {
    const beverages = [];
    const fields = document.querySelectorAll('.beverage');

    fields.forEach((field, index) => {
        const name = field.querySelector('select').value;
        const milk = field.querySelector('input[type="radio"]:checked').value;
        const extras = [];
        field.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            extras.push(checkbox.nextElementSibling.textContent);
        });
        beverages.push({
            name: dict[name],
            milk: dict[milk],
            extras: extras.join(', '),
            wishes: field.querySelector('.userText').value
        });
    });

    const modalTableBody = document.querySelector('.modalTable tbody');
    modalTableBody.innerHTML = '';
    beverages.forEach(beverage => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${beverage.name}</td>
            <td>${beverage.milk}</td>
            <td>${beverage.extras}</td>
            <td>${beverage.wishes}</td>
        `;
        modalTableBody.appendChild(row);
    });
}