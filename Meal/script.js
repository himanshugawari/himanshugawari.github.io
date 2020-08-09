const search = document.getElementById("search");
const submit = document.getElementById("submit");
const allMeals = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const modal = document.getElementById("modal");
// const closeBtn = document.getElementById("close");

const url = "http://starlord.hackerearth.com/recipe";

const details = [];

function fetchFromServer() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.map((item) => {
        // console.log("item", item);
        details.push(item);
      });
      allMeals.innerHTML = data
        .map(
          (meal) => `
            <div class="meal">
              <img src="${meal.image}" alt="${meal.id}" />
              <div class="meal-info" data-mealID="${meal.id}">
                <h3>${meal.name}</h3>
              </div>
            </div>
          `
        )
        .join("");
    });
}
fetchFromServer(url);

console.log("details", details);

function searching(m) {
  const searchArray = [];
  m.preventDefault();
  allMeals.innerHTML = "";
  resultHeading.innerHTML = "";
  const term = search.value.toLowerCase().trim();
  console.log(term);
  if (term) {
    details.filter((d) => {
      if (term === d.name.toLowerCase()) {
        console.log("foun0d", d.name);
        searchArray.push(d);
      }
    });
  }
  if (searchArray.length === 0) {
    // resultHeading.innerText = "No Such Item";
    resultHeading.innerHTML = `
    <h2>No Such Item</h2>
    <button class="back-btn" id="back-btn" onclick="backMain()">Back</button>`;
  } else {
    allMeals.innerHTML = searchArray
      .map(
        (meal) => `
                <div class="meal">
                  <img src="${meal.image}" alt="${meal.id}" />
                  <div class="meal-info" data-mealID="${meal.id}">
                    <h3>${meal.name}</h3>
                  </div>
                </div>
              `
      )
      .join("");
    resultHeading.innerHTML = `<button class="back-btn" id="back-btn" onclick="backMain()">Back</button>`;
  }
  search.value = "";
}

function backMain(b) {
  //   b.preventDefault();
  allMeals.innerHTML = "";
  resultHeading.innerHTML = "";
  allMeals.innerHTML = details
    .map(
      (meal) => `
            <div class="meal">
              <img src="${meal.image}" alt="${meal.id}" />
              <div class="meal-info" data-mealID="${meal.id}">
                <h3>${meal.name}</h3>
              </div>
            </div>
          `
    )
    .join("");
  search.value = "";
}

function getMealById(id) {
  const temp = [];
  //   console.log("id", id);
  details.filter((d) => {
    // console.log("did", d.id);

    if (Number(id) === Number(d.id)) {
      //   console.log("foun0d", d.id);
      temp.push(d);
    }
  });
  console.log("temp", temp);
  const finalItem = temp[0];
  modal.innerHTML = `
  <div class="modal">
    <div class="modal-header">
    <h1>${finalItem.name}</h1>
    </div>
    <div class="modal-content">
    <img src="${finalItem.image}" alt="${finalItem.strMeal}" />
    <p>${finalItem.description}</p>
    <p>Price ${finalItem.price}$</p>
    </div>
  </div>`;
}

submit.addEventListener("submit", searching);

allMeals.addEventListener("click", (element) => {
  //   console.log("adding modal", modal.classList.add("show-modal"));
  modal.classList.add("show-modal");
  const mealInfo = element.path.find((item) => {
    if (item.classList) {
      console.log("meal-info", item.classList.contains("meal-info"));
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

// closeBtn.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);
