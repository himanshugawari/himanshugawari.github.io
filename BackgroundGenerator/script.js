const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.querySelector("#gradient");
const button = document.querySelector("#button");

// console.log((Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6));

function setGradient() {
  body.style.background =
    "linear-gradient(to right," + color1.value + "," + color2.value + ")";

  css.textContent = body.style.background + ";";
}

function initial() {
  body.style.background =
    "linear-gradient(to right," + color1.value + "," + color2.value + ")";
  css.textContent = body.style.background + ";";
}

// Random Hex Generator(without #)
function generateRandom() {
  return (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

function setRandomGradient() {
  body.style.background =
    "linear-gradient(to right,#" +
    generateRandom() +
    "," +
    "#" +
    generateRandom() +
    ")";

  css.textContent = body.style.background + ";";
}

// Initail Gradient
initial();

// Gradient Generator
color1.addEventListener("input", setGradient);

// Gradient Generator
color2.addEventListener("input", setGradient);

// Random Gradient Generator
button.addEventListener("click", setRandomGradient);
