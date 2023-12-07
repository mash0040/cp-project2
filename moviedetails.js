document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('id');
    
    if (movieId) {
      // Fetch movie details using the movieId
      fetchMovieDetails(movieId);
    }
  });
  
  async function fetchMovieDetails(movieId) {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const movieDetails = await response.json();
      // Display movie details on the page
      renderMovieDetails(movieDetails);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      // Handle error display or logging
    }
  }
  
  function renderMovieDetails(movieDetails) {
    // Render the retrieved movie details on the page
    // Example: Display movie title, description, poster, etc.
  }
  