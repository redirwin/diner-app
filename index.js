import { menuArray } from "/data.js"

const menuSection = document.getElementById('menu')
const orderSection = document.getElementById('bill')

function getMenuHtml() {
    let menuHTML = ""
    menuArray.forEach(menuItem => {
        menuHTML += `
            <div class="item-container">
                <div class="item-emoji">${menuItem.emoji}</div>
                <div class="item-text-container">
                    <div class="item-name">${menuItem.name}</div>
                    <div class="item-ingredients">${menuItem.ingredients}</div>
                    <div class="item-price">$${menuItem.price}</div>
                </div>
                <div class="item-add"><p>+</p></div>
            </div>

        `
    });
    return menuHTML
}

function getBillHtml() {
    console.log("building bill")
}

function render() {
    menuSection.innerHTML = getMenuHtml()
    orderSection.innerHtml = getBillHtml()
}

render();