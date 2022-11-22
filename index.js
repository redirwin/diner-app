import { menuArray } from "/data.js";

const billArray = [];

document.addEventListener("click", (e) => {
  e.target.dataset.add && handleAddClick(e.target.dataset.add);
  e.target.dataset.remove && handleRemoveClick(e.target.dataset.remove);
  e.target.id === "complete-order-button" && renderModal();
  e.target.id === "exit-modal-button" && closeModal();
  e.target.id === "pay-button" && handlePaymentSubmission();
});

function handleAddClick(itemNumber) {
  const targetItem = menuArray.filter((menuItem) => {
    return menuItem.id == itemNumber;
  })[0];
  billArray.push(targetItem);
  getBillHtml();
  renderBill();
}

function handleRemoveClick(itemNumber) {
  billArray.splice(itemNumber, 1);
  renderBill();
}

function handlePaymentSubmission() {
  const form = document.getElementById("payment-form");
  const paymentData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    ccn: form.ccn.value,
    cvv: form.cvv.value,
  };
  checkValidPayment(paymentData);
}

function checkValidPayment(paymentData) {
  if (
    paymentData.firstName &&
    paymentData.lastName &&
    paymentData.ccn &&
    paymentData.cvv
  ) {
    document.getElementById("order-modal").innerHTML = `
          <div id="submitting-message">
              <p>Submitting Order</p>
              <img src="/assets/loading.svg" alt="submitting order"> 
          </div>
      `;
    setTimeout(() => {
      renderOrderSubmitted(paymentData.firstName);
    }, 3000);
  }
}

function closeModal() {
  document.getElementById("order-modal").classList.add("no-show");
}

function getMenuHtml() {
  let menuHTML = "";
  menuArray.forEach((menuItem, index) => {
    menuHTML += `
            <div class="item-container">
                <div class="item-emoji">${menuItem.emoji}</div>
                <div class="item-text-container">
                    <div class="item-name">${menuItem.name}</div>
                    <div class="item-ingredients">${menuItem.ingredients.join(
                      ", "
                    )}</div>
                    <div class="item-price">$${menuItem.price}</div>
                </div>
                <div class="item-add" data-add="${index}"></div>
            </div>
        `;
  });
  return menuHTML;
}

function getBillHtml() {
  let lineItems = "";
  let billTotal = 0;
  billArray.forEach((menuItem, index) => {
    billTotal += menuItem.price;
    lineItems += `
            <div class="line-item">
                <div class="line-item-name">${menuItem.name}</div>
                <div class="line-item-remove" data-remove="${index}">remove</div>
                <div class="line-item-price">$${menuItem.price}</div>            
            </div>
        `;
  });
  let billHtml =
    lineItems +
    `
        <div class="bill-total">
            <h3>Total price:</h3>
            <div>$${billTotal}</div>
        </div>    `;
  return `
        <h2>Your Order</h2>
        ${billHtml}
        <button id="complete-order-button">Complete Order</button>
    `;
}

function renderMenu() {
  document.getElementById("menu").innerHTML = getMenuHtml();
}

function renderBill() {
  if (billArray.length) {
    document.getElementById("bill").innerHTML = getBillHtml();
  } else {
    document.getElementById("bill").innerHTML = "";
  }
}

function renderModal() {
  const modal = document.getElementById("order-modal");
  modal.classList.remove("no-show");
  modal.innerHTML = `
        <h3>Enter card details <span id="exit-modal-button"></span></h3>
        <form id="payment-form" name="payment-form">
            <div id="name-fields">
                <input type="text" name="firstName" placeholder="Enter your first name" id="firstName"required>
                <input type="text" name="lastName" placeholder="Enter your last name" id="lastName"required>
            </div>
            <input type="text" name="ccn" placeholder="Enter card number" id="ccn" required>
            <input type="text" name="cvv" placeholder="Enter CVV" id="cvv" required>
            <button for="payment-form" id="pay-button" type="submit">Pay</button>
        </form>
    `;
}

function renderOrderSubmitted(name) {
  closeModal();
  document.getElementById("bill").innerHTML = `
        <p id="thanks">Thanks, ${name}! Your order is on its way!</p>
    `;
}

renderMenu();
