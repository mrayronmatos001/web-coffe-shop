//initial settings
const body = document.body;
const html = document.documentElement;
const root = document.querySelector(".root");

html.classList.add("m-0", "p-0")
body.classList.add(
    "d-flex", 
    "flex-column", 
    "justify-content-center", 
    "align-items-stretch", 
    "min-vh-100", 
    "m-0", 
    "p-0");
body.style.backgroundColor = "#f6ebda";
root.classList.add("m-4", "min-vh-100")

//DOM manipulation
import { returnCoffees } from "/scripts/api.js";

const header = document.createElement("header");
header.classList.add("d-flex", "justify-content-between", "align-items-center", "px-1");
header.innerHTML = `
    <figure class="d-flex justify-content-center align-items-center gap-1 col-2 pt-2">
        <img 
            style="transform: translateY(-15%)" 
            class="img-fluid w-25 w-md-25 w-lg-10" 
            src="/public/images/coffe-logo.png"
        >
        <figcaption 
            style="font-family:'Dancing Script'" 
            class="fs-3 fw-bold"><span style="color:brown">Coffee</span> Bar</figcaption
        />
    </figure>

    <div class="shopping-cart col-8 d-flex justify-content-end p-4 position-relative">
        <i class="bi bi-cart-fill fs-3 p-2" style="cursor:pointer"></i>
        <span class="bg-danger rounded-circle invisible" style="width:1rem; height:1rem; position: absolute; bottom:3.4rem; right:1.6rem; cursor:pointer"></span>
    </span>
    </div>
`;

const main = document.createElement("main");
main.classList.add("d-flex", "flex-column", "align-items-center");
main.innerHTML = `
    <div class="painel container d-flex justify-content-around w-100" align-items-center>
        <div class="painel_text col-6 fs-1 fw-bold d-flex justify-content-center align-items-center">
            <p>Saboreie seu <span style="color:brown">café</span> antes de suas atividades</p>
        </div>
        <div class="painel_img d-flex justify-content-end col-4">
            <img 
                class="w-100"
                src="/public/images/coffee-header.png"
            />
        </div>
    </div>
    <div class="coffees d-flex flex-column align-items-center">
        <h1 
            style="text-decoration: underline; text-decoration-color: brown; text-decoration-thickness: 5px; transform: translateX(100%)"
            class="p-2 align-self-start"
        >
            Opções
        </h1>
        <div class="coffee-cards justify-content-start row g-3 pt-2" style="width:90%; transform: translateX(5%)">
            
        </div>
    </div>
`;

async function fillCards() {
    const coffeeCards =  document.querySelector('.coffee-cards');
    coffeeCards.innerHTML = '';
    const coffees = await returnCoffees();
    coffees.forEach(cfe => {
        const cardHTML = `
            <div class="card m-2 p-0 col-2 shadow-lg" style="width:15rem; height:25rem">
                <img src="${cfe.image}" class="card-img-top w-100 h-100" alt="${cfe.description}"/>
                <div class="card-body">
                    <h5 class="card-title">${cfe.title}</h5>
                    <p class="card-text">Preço: R$${cfe.price.toFixed(2)}</p>
                    <button class="btn" style="background-color: brown; color: white">Comprar</button>
                </div>
            </div>
        `
        coffeeCards.innerHTML += cardHTML;
    })
}

export {header, main, fillCards};