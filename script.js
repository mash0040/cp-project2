const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `cdcbdcac2837a7886f31841cf04b185d`;
const TRENDING_MOVIE = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;
const POPULAR_MOVIE = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const RATED_MOVIE = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
const IMAGE_URL = `https://image.tmdb.org/t/p/w200`;

function getMovies(url, container) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => showMovies(response.results, container))
    .catch(function (err) {
      alert(err);
    });
}

getMovies(TRENDING_MOVIE, ".trending_container");
getMovies(POPULAR_MOVIE, ".popular_container");
getMovies(RATED_MOVIE, ".rated_container");

function showMovies(movies, container) {
  let cards = "";
  movies.forEach((movie) => (cards += showPosters(movie)));
  document.querySelector(container).innerHTML = cards;
}

function showPosters(movie) {
  const { title, name, poster_path } = movie;
  if (title !== undefined) {
    return `<div class="card poster_card">
                <a href="#"><img class="poster_img img-fluid" src="${IMAGE_URL + poster_path}" alt="${title}" draggable="false"></a>
                <div class="card-body">
                <p class="card-text">${title}</p>
                </div>
            </div>`;
  } else {
    return `<div class="card poster_card">
                <a href="#"><img class="poster_img img-fluid" src="${IMAGE_URL + poster_path}" alt="${name}" draggable="false"></a>
                <div class="card-body">
                <p class="card-text">${name}</p>
                </div>
            </div>`;
  }
}

gsap.registerPlugin(ScrollTrigger);

gsap.from(".navbar-brand, .navbar-toggler", {
  opacity: 0,
  duration: 0.6,
  delay: 0.3,
  y: 10,
});

gsap.from(".nav-item", {
  opacity: 0,
  duration: 0.6,
  delay: 0.2,
  y: 30,
  stagger: 0.2,
});

gsap.from(".slides", {
  scrollTrigger: ".slides",
  opacity: 0,
  duration: 0.6,
  delay: 0.4,
  y: -30,
});

gsap.from(".search", {
  scrollTrigger: ".search",
  opacity: 0,
  duration: 0.6,
  delay: 0.4,
  y: -30,
});

gsap.from(".link_section", {
  scrollTrigger: ".link_section",
  opacity: 0,
  duration: 0.8,
  delay: 0.8,
  x: -20,
  stagger: 0.6,
});

gsap.from(".title_trending", {
  scrollTrigger: ".title_trending",
  opacity: 0,
  duration: 0.6,
  delay: 0.4,
  x: -30,
});

gsap.from(".trending_container", {
  scrollTrigger: ".trending_container",
  opacity: 0,
  duration: 0.8,
  delay: 0.8,
  y: -30,
  stagger: 0.6,
});

gsap.from(".title_popular", {
  scrollTrigger: ".title_popular",
  opacity: 0,
  duration: 0.6,
  delay: 0.4,
  x: -30,
});

gsap.from(".popular_container", {
  scrollTrigger: ".popular_container",
  opacity: 0,
  duration: 0.8,
  delay: 0.8,
  y: -30,
  stagger: 0.6,
});

gsap.from(".title_rated", {
  scrollTrigger: ".title_rated",
  opacity: 0,
  duration: 0.6,
  delay: 0.4,
  x: -30,
});

gsap.from(".rated_container", {
  scrollTrigger: ".rated_container",
  opacity: 0,
  duration: 0.8,
  delay: 0.8,
  y: -30,
  stagger: 0.6,
});

gsap.from(".logo_footer", {
  scrollTrigger: ".logo_footer",
  opacity: 0,
  duration: 0.6,
  delay: 0.4,
  x: -30,
});

gsap.from(".credit, .services, .contact, .download", {
  scrollTrigger: ".credit, .services, .contact, .download",
  opacity: 0,
  duration: 0.8,
  delay: 0.6,
  y: -30,
  stagger: 0.2,
});

gsap.from(".copyright", {
  scrollTrigger: ".copyright",
  opacity: 0,
  duration: 1,
  delay: 0.9,
  y: 30,
});


function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}


function showSurveyPopup() {
  document.getElementById("survey-modal").style.display = "block";
  fetchGenres('movie-genre', 'https://api.themoviedb.org/3/genre/movie/list?language=en');
  fetchGenres('tv-genre', 'https://api.themoviedb.org/3/genre/tv/list?language=en');
}

function closeSurveyPopup() {
  document.getElementById("survey-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
      document.getElementById("survey-container").style.display = "flex";
      fetchGenres('movie-genre', 'https://api.themoviedb.org/3/genre/movie/list?language=en');
      fetchGenres('tv-genre', 'https://api.themoviedb.org/3/genre/tv/list?language=en');
  }, 2000);
});

function fetchGenres(selectId, apiUrl) {
  const options = {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2YzZDdlNWYzMWQyNjM5NGVmN2I3YjI2MzI2MGI5NyIsInN1YiI6IjY1NWJkNTEzMzM5NmI5MDBlNDRhMTYxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A6ke0ai1_JXjF4KiN4s1FWDNgaM-HKq9kvBCsaO5OpQ'
      }
  };

  fetch(apiUrl, options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const genreDropdown = document.getElementById(selectId);
          data.genres.forEach(genre => {
              const option = document.createElement("option");
              option.value = genre.id;
              option.text = genre.name;
              genreDropdown.appendChild(option);
          });
      })
      .catch(error => console.error(`Error fetching ${selectId} data:`, error));
}

async function initBanner(genreId, headingText = 'Recommended For You') {
  const headingElement = document.querySelector('.banner-heading');
  headingElement.textContent = headingText;

  const bannerSlides = document.querySelector('.glide__slides');
  bannerSlides.innerHTML = '';

  const movies = await fetchData(genreId);
  const slidesHTML = movies.map(movie => generateMovieHTML(movie)).join('');
  bannerSlides.innerHTML += slidesHTML;

  const glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 5000,
  });

  glide.mount();
}


  async function playTrailer(movieId) {
    const trailerKey = await fetchMovieTrailerKey(movieId);

    if (trailerKey) {
      const iframe = document.getElementById('trailerModalIframe');
      iframe.src = `https://www.youtube.com/embed/${trailerKey}?si=H8FdYPBeLvMxXFl8`;
    }
  }

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("survey-container").style.display = "flex";
    fetchGenres('movie-genre', 'https://api.themoviedb.org/3/genre/movie/list?language=en');
    fetchGenres('tv-genre', 'https://api.themoviedb.org/3/genre/tv/list?language=en');
  }, 2000);

  const movieGenre = getCookie("movieGenre");
  const tvGenre = getCookie("tvGenre");

  if (movieGenre || tvGenre) {
    const selectedGenreId = movieGenre || tvGenre;
    initBanner(selectedGenreId);
  }
});function submitSurvey() {
  var movieGenre = document.getElementById("movie-genre").value;
  var tvGenre = document.getElementById("tv-genre").value;

  document.cookie = "movieGenre=" + encodeURIComponent(movieGenre);
  document.cookie = "tvGenre=" + encodeURIComponent(tvGenre);

  document.querySelector('.banner-heading').style.display = 'block';

  fetchData(movieGenre || tvGenre)
    .then((movies) => {
      console.log(movies);

      initBanner(movieGenre || tvGenre, 'Recommended For You');
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
    });

  document.getElementById("survey-container").style.display = "none";
}



function cancelSurvey() {
  document.getElementById("survey-container").style.display = "none";
}

async function fetchData(genreId) {
  try {
    console.log('Fetching data for genre ID:', genreId);
    const apiKey = '03f3d7e5f31d26394ef7b7b263260b97';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=2023-08-01&primary_release_date.lte=2024-01-01&sort_by=popularity.desc&with_genres=${genreId}&api_key=${apiKey}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


function generateMovieHTML(movie) {
  return `
    <li class="glide__slide">
      <div class="row slides">
        <img class="banner_img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" draggable="false" />
        <div class="contents">
          <h1>${movie.title} <span>(${new Date(movie.release_date).getFullYear()})</span></h1>
          <p class="genre">${getGenreNames(movie.genre_ids)}</p>
          <p>${movie.overview}</p>
          <a class="play_trailer" href="#" data-bs-toggle="modal" data-bs-target="#trailerModal" onclick="playTrailer(${movie.id})">
          <img class="trailer_btn" src="./assets/icons/trailer btn.svg" alt="trailer" draggable="false" />
        </a>
        </div>
      </div>
    </li>
  `;
}

function getGenreNames(genreIds) {
  const genreMapping = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  return genreIds.map(id => genreMapping[id]).join(', ');
}
async function fetchMovieTrailerKey(movieId) {
  const trailerUrl = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;
  
  try {
    const response = await fetch(trailerUrl);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].key;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching movie trailer key:', error);
    return null;
  }
}
async function playTrailer(movieId) {
  const trailerKey = await fetchMovieTrailerKey(movieId);

  if (trailerKey) {
    const iframe = document.getElementById('trailerModalIframe');
    iframe.src = `https://www.youtube.com/embed/${trailerKey}?si=H8FdYPBeLvMxXFl8`;
  }
}

async function initBanner(genreId) {
  const bannerSlides = document.getElementById('bannerSlides');
  const movies = await fetchData(genreId);

  const slidesHTML = movies.map(movie => generateMovieHTML(movie)).join('');
  bannerSlides.innerHTML = slidesHTML;

  setTimeout(() => {
    new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      autoplay: 5000,
    }).mount();
  }, 100);

  async function playTrailer(movieId) {
    const trailerKey = await fetchMovieTrailerKey(movieId);

    if (trailerKey) {
      const iframe = document.getElementById('trailerModalIframe');
      iframe.src = `https://www.youtube.com/embed/${trailerKey}?si=H8FdYPBeLvMxXFl8`;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initBanner();
});


function slideLeft() {
  const container = document.querySelector('.trending_container');
  container.scrollLeft -= 200;
}

function slideRight() {
  const container = document.querySelector('.trending_container');
  container.scrollLeft += 200;
}

let popularIndex = 0;
let ratedIndex = 0;

function popularSlideLeft() {
  const container = document.querySelector('.popular_container');
  const posters = document.querySelectorAll('.popular_container .poster_card');
  const posterWidth = posters[0].offsetWidth;

  if (popularIndex > 0) {
    popularIndex--;
    container.scrollLeft -= posterWidth;
  }
}

function popularSlideRight() {
  const container = document.querySelector('.popular_container');
  const posters = document.querySelectorAll('.popular_container .poster_card');
  const posterWidth = posters[0].offsetWidth;
  const maxIndex = posters.length - Math.floor(container.offsetWidth / posterWidth);

  if (popularIndex < maxIndex) {
    popularIndex++;
    container.scrollLeft += posterWidth;
  }
}

function ratedSlideLeft() {
  const container = document.querySelector('.rated_container');
  const posters = document.querySelectorAll('.rated_container .poster_card');
  const posterWidth = posters[0].offsetWidth;

  if (ratedIndex > 0) {
    ratedIndex--;
    container.scrollLeft -= posterWidth;
  }
}

function ratedSlideRight() {
  const container = document.querySelector('.rated_container');
  const posters = document.querySelectorAll('.rated_container .poster_card');
  const posterWidth = posters[0].offsetWidth;
  const maxIndex = posters.length - Math.floor(container.offsetWidth / posterWidth);

  if (ratedIndex < maxIndex) {
    ratedIndex++;
    container.scrollLeft += posterWidth;
  }
}

function closeTrailer() {
  const iframe = document.getElementById('trailerModalIframe');
  iframe.src = '';

  $('#trailerModal').modal('hide');
}

$('#nav ul li a').click(function (event) {
  const linkText = $(this).text().trim();

  const bannerHeading = document.querySelector('.banner-heading');

  if (linkText === 'Custom Result') {
    if (bannerHeading) {
      bannerHeading.style.display = 'none';
    }

    document.getElementById("movie-genre").value = "";
    document.getElementById("tv-genre").value = "";
    initBanner();
  }

  event.preventDefault();
  window.scrollTo(0, 0);
});

