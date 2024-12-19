import { returnCoffees } from "/scripts/api.js";
import { header, main } from "/scripts/index.js";

const container = document.createElement('div');
container.classList.add('container', 'my-5');
const cartDisplay = document.createElement('div');
const paymentDisplay = document.createElement('div');
let isPayActive = false;
let isFinalActive = false;
container.innerHTML = `
    <div class="d-flex justify-content-between mb-0">
        <div class="progress-step active">
        <div class="icon"><i class="bi bi-cart"></i></div>
        <small>Carro</small>
        </div>
        <div class="progress-step">
        <div class="icon"><i class="bi bi-credit-card"></i></div>
        <small>Pagamento</small>
        </div>
        <div class="progress-step">
        <div class="icon"><i class="bi bi-check2-circle"></i></div>
        <small>Finalizar</small>
        </div>
    </div>
    <div class="progress">
        <div class="progress-bar progress-bar-custom" style="width: 2%;"></div>
    </div>
    <div class="coffees-cart container d-flex flex-column align-items-center">
        <div class="coffee-list d-flex justify-content-center mt-5">

        </div>
        <p class="result display-1 text-center"></p>
        <div class="buttons">
            <button class="btn" style="background-color:brown; color:white">Confirmar</button>
            <button class="btn bg-secondary">Limpar Carrinho</button>
        </div>
    </div>
`;

cartDisplay.classList.add("coffees-cart", "container", "d-flex", "flex-column", "align-items-center");
cartDisplay.innerHTML = `
    <div class="coffee-list d-flex justify-content-center mt-5">

    </div>
    <p class="result display-1 text-center"></p>
    <div class="buttons">
        <button class="btn" style="background-color:brown; color:white">Confirmar</button>
        <button class="btn bg-secondary">Limpar Carrinho</button>
    </div>
`;

paymentDisplay.classList.add('payment-form', 'container', 'd-flex', 'flex-column', 'align-items-center', 'mt-5');
paymentDisplay.innerHTML = `
    <form class="w-50">
        <h2 class="text-center mb-4">Escolha seu Método de Pagamento</h2>
        <div class="form-check mb-3">
            <input class="form-check-input" type="radio" name="paymentMethod" id="creditCard" value="creditCard" checked>
            <label class="form-check-label" for="creditCard">Cartão de Crédito</label>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="radio" name="paymentMethod" id="debitCard" value="debitCard">
            <label class="form-check-label" for="debitCard">Cartão de Débito</label>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="radio" name="paymentMethod" id="pix" value="pix">
            <label class="form-check-label" for="pix">PIX</label>
        </div>
        <button type="button" class="btn" style="background-color:brown; color:white">Confirmar</button>
    </form>
`;

const cartMap = {}
for (let i = 0; i < 19; i++) {
    cartMap[`card${i}`]=0;
}

const transitionProgress = (situation, porcentage, position) => {
    const progress = container.querySelector(`.progress-step:nth-child(${position})`);
    const progressBar = container.querySelector('.progress-bar');
    progress.classList.toggle(situation);
    progressBar.style.width = porcentage;
}

const fillPaymentForm = () => {
    isPayActive = true;
    isFinalActive = false;
    const coffeesCart = document.querySelector('.coffees-cart');
    container.removeChild(coffeesCart);
    transitionProgress('active', '50%', 2);
    const paymentForm = document.createElement('div');
        paymentForm.classList.add('payment-form', 'container', 'd-flex', 'flex-column', 'align-items-center', 'mt-5');
        paymentForm.innerHTML = `
            <form class="w-50">
                <h2 class="text-center mb-4">Escolha seu Método de Pagamento</h2>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="creditCard" value="creditCard" checked>
                    <label class="form-check-label" for="creditCard">Cartão de Crédito</label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="debitCard" value="debitCard">
                    <label class="form-check-label" for="debitCard">Cartão de Débito</label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="pix" value="pix">
                    <label class="form-check-label" for="pix">PIX</label>
                </div>
                <button type="button" class="btn" style="background-color:brown; color:white">Confirmar</button>
            </form>
        `;
        container.append(paymentForm);

        const buttonConfirmPayment = document.querySelector(".btn");
        buttonConfirmPayment.onclick = () => {

            const selectedRadio = document.querySelector('input[type="radio"]:checked');
            const selectedValue = selectedRadio.value;
            
            switch (selectedValue) {
                case "debitCard":
                case "creditCard": {
                    paymentForm.innerHTML = `
                        <h3 class="mb-4">Pagamento com Cartão de Crédito</h3>
                        <form class="needs-validation" novalidate>
                            <div class="mb-3">
                                <label for="cardNumber" class="form-label">Número do Cartão</label>
                                <input type="text" class="form-control" id="cardNumber" placeholder="Digite o número do cartão" required>
                                <div class="invalid-feedback">Por favor, insira um número de cartão válido.</div>
                            </div>
                            <div class="mb-3">
                                <label for="cardName" class="form-label">Nome no Cartão</label>
                                <input type="text" class="form-control" id="cardName" placeholder="Digite o nome no cartão" required>
                                <div class="invalid-feedback">Por favor, insira o nome no cartão.</div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="expiryDate" class="form-label">Data de Validade</label>
                                    <input type="text" class="form-control" id="expiryDate" placeholder="MM/AA" required>
                                    <div class="invalid-feedback">Por favor, insira uma data de validade.</div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <input type="password" class="form-control" id="cvv" placeholder="CVV" required>
                                    <div class="invalid-feedback">Por favor, insira o CVV.</div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success w-100">Pagar</button>
                        </form>
                    `;
                }
                break;

                case "pix": {
                    paymentForm.innerHTML = `
                        <h3 class="mb-4">Pagamento via PIX</h3>
                        <p>Escaneie o QR Code abaixo para realizar o pagamento:</p>
                        <div class="d-flex justify-content-center">
                            <img src="/public/images/qrcode.png" alt="QR Code para pagamento via PIX" class="img-fluid mb-4" style="max-width: 200px;">
                        </div>
                        <button type="submit" class="btn btn-success col-3">Confirmar Pagamento</button>
                    `;
                }
            }

            const btnSucess = document.querySelector("button[type='submit'");
            btnSucess.onclick = () => {
                isFinalActive = true;
                isPayActive = true;
                const final = document.createElement('div');
                final.classList.add("final", "d-flex", "flex-column", "align-items-center", "mt-4");
                final.innerHTML = `
                    <h3 class="mb-4 text-success">Compra Finalizada</h3>
                    <p class="text-center">Obrigado por sua compra! Seu pedido foi processado com sucesso.</p>
                    <div class="d-flex justify-content-center">
                        <img src="/public/images/thank-you.png" alt="Compra Finalizada" class="img-fluid" style="max-width: 200px;">
                    </div>
                    <p class="text-center mt-4">Um e-mail com os detalhes da sua compra foi enviado para você. Caso tenha dúvidas, entre em contato com o suporte.</p>
                `;
                container.removeChild(paymentForm);
                container.append(final);
                transitionProgress('active', '100%', 3);
            }   
        }
}

const progressSteps = () => {
    const stepCart = document.querySelector(".progress-step:nth-child(1)");
    const stepPay = document.querySelector(".progress-step:nth-child(2)");
    const stepFinal = document.querySelector(".progress-step:nth-child(3)");
    stepCart.onclick = () => {
        isPayActive = false;
        isFinalActive = false;
        const paymentForm = document.querySelector('.payment-form');
        container.removeChild(paymentForm);
        container.append(cartDisplay);
        transitionProgress('active', '2%', 2);
        spaStepCart()
    };
    stepPay.onclick = () => {
        
        if (isPayActive) {
            const final = document.querySelector(".final");
            container.removeChild(final);
            container.append(paymentDisplay);
            transitionProgress('active', '50%', 2);
            stepPay.classList.toggle('active');
            stepFinal.classList.toggle('active');
        }
    };
}

const removeIndex = (root) => {
    root.removeChild(header);
    root.removeChild(main);
    root.append(container);
}

const spaStepCart = () => {
    fillShoppingCart();
    const confirmBtn = document.querySelector(".buttons .btn:first-child");
    const clearBtn = document.querySelector(".bg-secondary");
    confirmBtn.onclick = () => fillPaymentForm();
    clearBtn.onclick = () => clearCartDisplay();
}

const managerCartMap = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const coffeeCardsContainer = document.querySelector('.coffee-cards');
        const observer = new MutationObserver(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const btn = card.querySelector('button')
                btn.onclick = () => {
                    const key = `card${index}`
                    cartMap[key] += 1;
                    addItemToCart(key, cartMap[key])
                    popupCart();
                };
            })

            if (cards.length > 0) {
                observer.disconnect();
            }
        });
        observer.observe(coffeeCardsContainer, { childList: true });
    });
}

const popupCart = () => {
    const cart = document.querySelector('.shopping-cart span');
    let isEmpty = true;
    const cartStorage = getCart();
    for (let i = 0; i < 19; i++) {
        if (cartStorage[`card${i}`] > 0) {
            isEmpty = false;
            break;
        }
    }
    if (!isEmpty) {
        cart.classList.remove("invisible");
        cart.classList.add("visible");
    }
}

async function fillShoppingCart() {
    let sum = 0;
    const coffeList = document.querySelector('.coffee-list');
    const result = document.querySelector('.result');
    coffeList.innerHTML = '';
    const coffees = await returnCoffees();
    const cartStorage = getCart();
    for (let card in cartStorage) {
        if (cartStorage[card]>0) {
            const index = Number(card.replace("card", ""));
            sum += cartStorage[card]*Number(coffees[index].price.toFixed(2));
            coffeList.innerHTML += `
                <div class="card m-2 p-0 col-2 shadow-lg" style="width:15rem; height:18rem">
                    <img src="${coffees[index].image}" class="card-img-top w-100 h-100" alt="${coffees[index].description}"/>
                    <div class="card-body">
                        <h5 class="card-title">${coffees[index].title}</h5>
                        <p class="card-text"><strong>Preço total</strong>: R$${cartStorage[card]*Number(coffees[index].price.toFixed(2))}</p>
                    </div>
                </div>
            `;
        }
    }
    result.innerHTML = '';
    result.innerHTML = `<strong>total R$${sum}</strong>`;
}

const clearCartDisplay = () => {
    clearCart();
    fillShoppingCart();
}

const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : {};
}

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const addItemToCart = (key, value) => {
    const cart = getCart();
    cart[key] = value;
    saveCart(cart);
}

const clearCart = () => {
    localStorage.removeItem("cart");
}

export {  
    container, 
    managerCartMap, 
    cartMap, 
    fillShoppingCart, 
    popupCart, 
    clearCartDisplay, 
    fillPaymentForm,
    spaStepCart,
    progressSteps,
    removeIndex
};