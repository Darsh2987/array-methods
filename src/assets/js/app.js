import "../styles/css/styles.css";

window.addEventListener("load", () => {
  //Global variables
  const addUserBtn = document.querySelector("#add-user");
  const doubleBtn = document.querySelector("#double");
  const showMillionairesBtn = document.querySelector("#show-millionaires");
  const sortBtn = document.querySelector("#sort");
  const calculateWealthBtn = document.querySelector("#calculate-wealth");
  const main = document.querySelector("#main");

  // Data array
  let userData = [];

  // Fetch random user data form the api and add money
  async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const user = data.results[0];

    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  }

  // Function to double money
  function doubleMoney() {
    userData = userData.map((user) => {
      return { ...user, money: user.money * 2 };
    });

    updateDom();
  }

  // Function sort users by richest
  function sortByRichest() {
    userData.sort((a, b) => b.money - a.money);
    updateDom();
  }

  // Function to show Millionaires
  function showMillionaires() {
    userData = userData.filter((user) => user.money > 1000000);

    updateDom();
  }

  // Function to alculate Wealth
  function calculateWealth() {
    const wealth = userData.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement("div");
    wealthEl.classList.add("total-wealth");
    wealthEl.innerHTML = `<h3>Total Wealth:</h3> <strong>${formatMoney(wealth)}<strong>`;
    main.appendChild(wealthEl);
  }

  // Function to add data(newUser) to the userData array
  function addData(obj) {
    userData.push(obj);
    updateDom();
  }

  // Format the wealth number to money
  function formatMoney(number) {
    return "£" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  //update the DOM
  function updateDom(providedData = userData) {
    // Clear main div element

    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    // Iterate through the providedData and build out the HTML
    providedData.forEach((item) => {
      const divElement = document.createElement("div");
      divElement.classList.add("person");
      divElement.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
      main.appendChild(divElement);
    });
  }

  // Event listeners
  addUserBtn.addEventListener("click", getRandomUser);
  doubleBtn.addEventListener("click", doubleMoney);
  sortBtn.addEventListener("click", sortByRichest);
  showMillionairesBtn.addEventListener("click", showMillionaires);
  calculateWealthBtn.addEventListener("click", calculateWealth);

  getRandomUser();
  getRandomUser();
  getRandomUser();
});
