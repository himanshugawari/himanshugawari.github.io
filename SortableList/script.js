const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  {
    name: "Jeff Bezos",
    worthInBillionDollars: 190,
    description:
      "The former hedge fund manager turned online book seller started Amazon in his garage in 1994. Bezos has invested heavily in space technology and also owns The Washington Post newspaper.",
  },
  {
    name: "Bill Gates",
    worthInBillionDollars: 120,
    description:
      "A permanent fixture at the top end of rich list for the past 20 years, the Microsoft founder has sold or given away much of his stake in the company – he owns just 1% of Microsoft – and now focuses predominantly on his philanthropic work.",
  },
  {
    name: "Mark Zuckerberg",
    worthInBillionDollars: 100,
    description:
      "Zuckerberg famously started Facebook in 2004 at the age of 19 and now is among the top five richest men in the world.",
  },
  {
    name: "Bernard Arnault",
    worthInBillionDollars: 81.4,
    description:
      "Arnault is the wealthiest European on the list. The Frenchman oversees an empire of more than 60 brands including Louis Vuitton and Sephora.",
  },
  {
    name: "Mukesh Ambani",
    worthInBillionDollars: 80.3,
    description:
      "Indian Ambani has a 42% controlling stake in Reliance Industries, which is the owner of the world’s largest oil refining complex. He is also the owner of property worth more than $400m.",
  },
  {
    name: "Steve Ballmer",
    worthInBillionDollars: 77.7,
    description:
      "The American was the former CEO of Microsoft from 2000 to 2014. He is the current owner of the Los Angeles Clippers NBA franchise.",
  },
  {
    name: "Warren Buffett",
    worthInBillionDollars: 77.5,
    description:
      "Now in his ninth decade, the Berkshire Hathaway chief executive, known as the “Oracle of Omagh” is one of the most successful investors of all time. Like Gates he has pledged to give away more than 99% of his fortune to charity.",
  },
  {
    name: "Larry Page",
    worthInBillionDollars: 71.6,
    description:
      "Internet entrepreneur Page is one of the co-founders of Google. He stepped down as CEO of Google’s parent company Alphabet Inc. in December 2019 but remains a board member.",
  },
  {
    name: "Elon Musk",
    worthInBillionDollars: 70.2,
    description:
      "Musk is the founder and CEO of SpaceX and also the CEO of Tesla.",
  },
  {
    name: "Sergey Brin",
    worthInBillionDollars: 69.4,
    description:
      "Along with Larry Page, Brin was a co-founder of Google. Until December 2019 he was president of Alphabet Inc.",
  },
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      // console.log(index);
      let listItem = document.createElement("li");
      //   listItem.classList.add("wrong");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="person-name">${
      person.name + " $" + person.worthInBillionDollars
    }</p>
    <i class="fa fa-grip-lines"></i>
    </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  //   console.log("Event", "dragStart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
}

function dragOver(e) {
  //   console.log("Event", "dragOver");
  e.preventDefault();
}

function dragDrop() {
  //   console.log("Event", "dragDrop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const item1 = listItems[fromIndex].querySelector(".draggable");
  const item2 = listItems[toIndex].querySelector(".draggable");
  //   console.log(item1, item2);
  listItems[fromIndex].appendChild(item2);
  listItems[toIndex].appendChild(item1);
}

function dragEnter() {
  //   console.log("Event", "dragEnter");
  this.classList.add("over");
}

function dragLeave() {
  //   console.log("Event", "dragLeave");
  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    // const personName = listItem.querySelector(".draggable").innerText.trim();
    const personName = listItem.querySelector(".person-name").innerHTML.trim();
    // console.log(listItem);
    const temp = personName.split(" ", 2);
    // console.log(temp[0] + " " + temp[1]);
    // console.log(personName, richestPeople[index].name);
    // let personNameTemp = temp[0] + " " + temp[1];
    if (temp.join(" ") !== richestPeople[index].name) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
