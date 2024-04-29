// Getting all required elements
const searchBar = document.querySelector(".search-bar");
const inputBox = document.querySelector("input");
const suggBox = document.querySelector(".autocom-box");

// Function to fetch suggestions from the API
async function fetchSuggestionsFromApi(input) {
  const response = await fetch(`https://api-aniwatch.onrender.com/anime/search/suggest?q=${input}`);
  const data = await response.json();
  return data.suggestions;
}

// Autocomplete functionality
inputBox.onkeyup = async (e) => {
  let userData = e.target.value;
  let array = [];
  if (userData) {
    const suggestions = await fetchSuggestionsFromApi(userData);
    array = suggestions.map((data) => data.name);
    array = array.filter((name) => name.toLowerCase().startsWith(userData.toLowerCase()));
    array = array.map((name) => '<li>' + name + '</li>');
    searchBar.classList.add("active");
    showSuggestions(array);
    let allList = suggBox.querySelectorAll("li");
    allList.forEach((item) => {
      item.addEventListener("click", () => select(item));
    });
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
