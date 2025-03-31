let searchQuery = "monster"; // Search term
let suggestions = [];

// Fetch suggestions from API
fetch(`https://aniwatch-api-net.vercel.app/api/v2/hianime/search/suggestion?q=${searchQuery}`)
  .then(response => response.json())
  .then(data => {
    suggestions = data.map(suggestion => suggestion.name);
    console.log(suggestions); // Display fetched names in the console
  })
  .catch(error => {
    console.error('Error fetching suggestions:', error);
  });
