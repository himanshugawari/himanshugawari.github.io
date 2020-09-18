const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.getElementById("list");

function inputLength() {
  return input.value.length;
}

function checkListItems() {
  return document.getElementsByTagName("li").length;
}

function createListElement() {
  var li = document.createElement("li");
  // li.classList.add("listItem");
  li.appendChild(document.createTextNode(input.value));
  li.addEventListener("click", toggleDone);
  ul.appendChild(li);
  input.value = "";

  var btn = document.createElement("button");
  btn.classList.add("tmpBtn");
  btn.appendChild(document.createTextNode("Delete"));
  btn.addEventListener("click", deleteBtn);
  li.appendChild(btn);

  function deleteBtn() {
    li.remove();
  }

  function toggleDone() {
    li.classList.toggle("done");
  }
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(e) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

// button.addEventListener("click", function () {
//   if (input.value.length > 0) {
//     let li = document.createElement("li");
//     li.appendChild(document.createTextNode(input.value));
//     ul.appendChild(li);
//     input.value = "";
//   }
// });

// input.addEventListener("keypress", function (e) {
//   if (input.value.length > 0 && event.keyCode === 13) {
//     let li = document.createElement("li");
//     li.appendChild(document.createTextNode(input.value));
//     ul.appendChild(li);
//     input.value = "";
//   }
// });
