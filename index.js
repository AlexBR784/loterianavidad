let resultado = document.getElementById("resultado");

/**
 * This asynchronous function searches for a lottery number in a remote JSON file.
 * It first disables the search button and displays a spinner for loading.
 * Then it fetches the JSON file and checks if the number is in the list of winners.
 * If the number is found, it displays a success message and the prize won.
 * If the number is not found, it displays a failure message.
 * After the search, it enables the search button and hides the spinner.
 *
 * @async
 * @function search
 * @returns {Promise<boolean>} Returns a promise that resolves to true if the number is found, false otherwise.
 */
async function search() {
  const num = "0" + document.getElementById("numero").value;
  const buscarBtn = document.getElementById("buscarBtn");
  const spinner = document.getElementById("spinner");

  buscarBtn.disabled = true;
  spinner.style.display = "inline-block";

  const data = await fetchData(
    "https://search-lot.atresmedia.com/christmas_2024/result.json"
  );
  const compruebe = data.compruebe;

  for (const item of compruebe) {
    if (item.decimo == num) {
      updateUI(true, num, item.prize);
      return true;
    }
  }

  updateUI(false, num);
  return false;
}

/**
 * This asynchronous function fetches data from a given URL.
 * It returns the fetched data as a JavaScript object.
 * If an error occurs during the fetch operation, it logs the error and throws it.
 *
 * @async
 * @function fetchData
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} Returns a promise that resolves to the fetched data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * This function updates the UI based on the search result.
 * If the number is found, it displays a success message and the prize won.
 * If the number is not found, it displays a failure message.
 * After updating the UI, it enables the search button and hides the spinner.
 *
 * @function updateUI
 * @param {boolean} isWinner - Whether the number is found.
 * @param {string} [num] - The lottery number that was searched for. Required if isWinner is true.
 * @param {number} [prize] - The prize won. Required if isWinner is true.
 */
function updateUI(isWinner, num, prize) {
  const buscarBtn = document.getElementById("buscarBtn");
  const spinner = document.getElementById("spinner");
  buscarBtn.disabled = false;
  spinner.style.display = "none";

  if (isWinner) {
    resultado.style.display = "block";
    resultado.innerHTML = `El número ${num} se encuentra entre los ganadores con un premio de ${(
      prize / 100
    ).toLocaleString("es-ES", { style: "currency", currency: "EUR" })}`;
    resultado.style.color = "green";
    createCard(num, prize);
  } else {
    resultado.style.display = "block";
    resultado.innerHTML = `El número ${num} no se encuentra entre los ganadores`;
    resultado.style.color = "red";
  }
}

/**
 * This function creates a card with the given number and prize.
 * It then appends the card to the cards container.
 *
 * @function createCard
 * @param {string} num - The lottery number.
 * @param {number} prize - The prize won.
 */
function createCard(num, prize) {
  const card = document.createElement("div");
  card.classList.add("card", "text-center", "p-3", "mb-4", "border");
  card.style.borderRadius = "15px";
  card.style.background = "white";
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Número: ${num}</h5>
      <hr>
      <p class="card-text">Premio: ${(prize / 100).toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
      })}</p>
      <hr>
      <p class="card-text"><small class="text-muted">Loteria de Navidad</small></p>
    </div>
  `;
  document.getElementById("cards").appendChild(card);
}
