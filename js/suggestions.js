const fetchSuggestions = async () => {
  const response = await fetch('https://api.example.com/suggestions');
  const data = await response.json();
  const suggestions = data.suggestions.map(item => item.name);
  return suggestions;
};

// Call the function to fetch suggestions
fetchSuggestions()
  .then(suggestions => {
    console.log(suggestions);
  })
  .catch(error => {
    console.error(error);
  });
