import { header, main, fillCards } from "/scripts/index.js";
import {  
    managerCartMap,  
    popupCart,  
    spaStepCart,
    progressSteps,
    removeIndex
} from "./scripts/cartManager.js";

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

//loading
root.append(header, main);
fillCards();
window.onload = () => popupCart();

//spa events
const cart = document.querySelector('.bi');
cart.onclick = () => {
    removeIndex(root);
    spaStepCart();
    progressSteps();
};

//manager cartMap
managerCartMap();
