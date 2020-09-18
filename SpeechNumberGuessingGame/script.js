const message = document.getElementById("msg");

const randomNumber = getRandomNumber();

console.log("Number : ", randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  //   console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
}

function checkNumber(msg) {
  const num = Number(msg);
  if (Number.isNaN(num)) {
    message.innerHTML += `<div> That is not a valid number</div>`;
    return;
  }
  if (num > 100 || num < 1) {
    message.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }
  if (num === randomNumber) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the correct number!<br><br>That is ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNumber) {
    message.innerHTML += `<div>GO LOWER</div>`;
  } else {
    message.innerHTML += `<div>GO HIGHER</div>`;
  }
}

function writeMessage(msg) {
  message.innerHTML = `
  <div> You said</div>
  <span class="box">${msg}</span>
  `;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
