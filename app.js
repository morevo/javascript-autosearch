let search = document.querySelector(".book-search-input");
let result = document.querySelector(".book-search-result");

/* Create delay */
let delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

/* Follow the change with the help of "input" */
search.addEventListener("input", () => {
  /* If input length > 3 */
  if (search.value.length > 3) {
    /* Send a request to the server with a delay 3s. Use async, await promises */
    async function getFetchDatas() {
      await delay(3000);
      let response = await fetch(
        /* Search match words */
        `https://www.googleapis.com/books/v1/volumes?q=${search.value}`
      );
      /* If 200-299, take response and add it in result */
      if (response.ok) {
        let resultResponse = await response.json();
        result.textContent = JSON.stringify(resultResponse);
        /* If 0 matches */
        if (result.textContent.length === 39) {
          result.textContent = "No matches";
        }
      }
    }
    getFetchDatas();
    /* If input is clear */
  } else if (search.value.length === 0) {
    result.textContent = "";
  }
});
