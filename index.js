import { menuArray } from "/data.js"

const billArray = []

document.addEventListener('click', (e) => {

    e.target.dataset.add && handleAddClick(e.target.dataset.add)
    e.target.dataset.remove && handleRemoveClick(e.target.dataset.remove)
    
})

function handleAddClick(itemNumber) {
    const targetItem = menuArray.filter(menuItem => {
        return menuItem.id == itemNumber
    })[0]
    billArray.push(targetItem)
    getBillHtml()
    renderBill()
}

function handleRemoveClick(itemNumber) {    
    billArray.splice(itemNumber, 1)
    renderBill()
}

function getMenuHtml() {
    let menuHTML = ""
    menuArray.forEach((menuItem, index) => {
        menuHTML += `
            <div class="item-container">
                <div class="item-emoji">${menuItem.emoji}</div>
                <div class="item-text-container">
                    <div class="item-name">${menuItem.name}</div>
                    <div class="item-ingredients">${menuItem.ingredients.join(", ")}</div>
                    <div class="item-price">$${menuItem.price}</div>
                </div>
                <div class="item-add" data-add="${index}"></div>
            </div>
        `
    });
    return menuHTML
}

function getBillHtml() {
    let lineItems = ""
    let billTotal = 0
    billArray.forEach((menuItem, index) => {
        billTotal += menuItem.price
        lineItems += `
            <div class="line-item">
                <div class="line-item-name">${menuItem.name}</div>
                <div class="line-item-remove" data-remove="${index}">remove</div>
                <div class="line-item-price">$${menuItem.price}</div>            
            </div>
        `
    })
    let billHtml = lineItems + `
        <div class="bill-total">
            <div>Total price:</div>
            <div>$${billTotal}</div>
        </div>    `
    return `<h2>Your Order</h2>` + billHtml
}

function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

function renderBill() {
    document.getElementById('bill').innerHTML = getBillHtml()
}

renderMenu();
