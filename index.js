let formsCount = 1;
document.querySelector(".add-button").addEventListener("click", () => {
    formsCount++;
    let allForms = document.querySelectorAll(".beverage");
    let newForm = allForms[allForms.length - 1].cloneNode(true);
    newForm.querySelector("h4").innerHTML = `Напиток №${formsCount}`;

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
    let overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'visible';
}