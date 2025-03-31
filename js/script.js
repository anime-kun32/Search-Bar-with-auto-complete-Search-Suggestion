// Getting all required elements
const searchBar = document.querySelector(".search-bar");
const inputBox = document.querySelector("input");
const suggBox = document.querySelector(".autocom-box");

// Function to fetch suggestions from the API
async function fetchSuggestionsFromApi(input) {
  const response = await fetch(`https://aniwatch-api-net.vercel.app/api/v2/hianime/search/suggestion?q=${input}`);
  const data = await response.json();
  return data.suggestions;
}

// Autocomplete functionality
inputBox.onkeyup = async (e) => {
  let userData = e.target.value;
  let array = [];
  if (userData) {
    const response = await fetchSuggestionsFromApi(userData);
    if (response.success) {
      array = response.data.suggestions
        .filter((data) => data.name.toLowerCase().startsWith(userData.toLowerCase()))
        .map((data) => `<li>${data.name}</li>`);
      
      searchBar.classList.add("active");
      showSuggestions(array);
      
      let allList = suggBox.querySelectorAll("li");
      allList.forEach((item) => {
        item.addEventListener("click", () => select(item));
      });
    }
  } else {
    searchBar.classList.remove("active");
  }
}


function select(element) {
  let selectUserData = element.textContent;
  inputBox.value = selectUserData;
  searchBar.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    listData = '<li>No suggestions found</li>';
  } else {
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
} 
