let suggestions = [];

// Fetch suggestions from API
fetch('https://api-aniwatch.onrender.com/anime/search/suggest')
  .then(response => response.json())
  .then(data => {
    suggestions = data.suggestions.map(suggestion => suggestion.name);
    console.log(suggestions); // Display fetched names in the console
  })
  .catch(error => {
    console.error('Error fetching suggestions:', error);
  });
