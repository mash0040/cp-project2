// Mert Halil Acun

function initSlider(selector) {
  $(selector).slick({
    slidesToShow: 3,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  });
}

const api_key = "03f3d7e5f31d26394ef7b7b263260b97";
const imageBaseUrl = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function (url, callback, optionalParam) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const pageContent = document.querySelector("[page-content]");

const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) {
    newGenreList.push(name);
  }
  return newGenreList.join(", ");
};

const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(", ");
};

const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director");
  const directorList = [];
  for (const { name } of directors) {
    directorList.push(name);
  }
  return directorList.join(", ");
};

const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type === "Trailer" || type === "Teaser") && site === "YouTube"
  );
};

async function fetchAndDisplayMovieDetails() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US&append_to_response=casts,videos,images,releases`
    );
    const movie = await response.json();

    const {
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      releases: {
        countries: [{ certification }],
      },
      genres,
      overview,
      casts: { cast, crew },
      videos: { results: videos },
    } = movie;

    document.title = `${title} - cineBro.`;

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    movieDetail.innerHTML = `

      <figure class="poster-box movie-poster">
        <img src="${imageBaseUrl}w342${poster_path}" alt="${title}" class="img-cover">
      </figure>

      <div class="detail-box">
        <div class="detail-content">
          <h1 class="heading">${title}</h1>
          <div class="meta-list">
            <div class="meta-item">
              <i class="fa fa-star" aria-hidden="true" alt='rating'></i>
              <span class="span">${vote_average.toFixed(1)} / 10</span>
            </div>
            <div class="separator"></div>
            <div class="meta-item">${runtime} minutes</div>
            <div class="separator"></div>
            <div class="meta-item">${release_date.split("-")[0]}</div>
            <div class="meta-item card-badge">${certification}</div>
          </div>
          <p class="genre">${getGenres(genres)}</p>
          <p class="overview">${overview}</p>
          <ul class="detail-list">
            <div class="list-item">
              <p class="list-name">Starring</p>
              <p>${getCasts(cast)}</p>
            </div>
            <div class="list-item">
              <p class="list-name">Directed By</p>
              <p>${getDirectors(crew)}</p>
            </div>
          </ul>
        </div>
        </div>
    `;

    const trailerContent = document.createElement("div");
    trailerContent.classList.add("trailer-content");
    trailerContent.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">Trailer and Clips</h3>
    </div>
    <div class="slider-list">
      <div id="trailerCarousel" class="carousel2">
        <div class="slider-inner"></div>
      </div>
    </div>`;

    const sliderInner = trailerContent.querySelector("#trailerCarousel");

    for (const { key, name } of filterVideos(videos)) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");
      videoCard.innerHTML = `
        <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" preload="auto"></iframe>
      `;
      sliderInner.appendChild(videoCard);
    }

    $(sliderInner).slick({
      slidesToShow: 3,
      centerMode: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          },
        },
      ],
      variableWidth: true,
    });

    pageContent.appendChild(movieDetail);
    pageContent.appendChild(trailerContent);

    await fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`,
      addSuggestedMovies
    );
  } catch (error) {
    console.error("Error fetching and displaying movie details:", error);
  }
}

const addSuggestedMovies = function ({ results: movieList }) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = "You may Also Like";

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">You May Also Like</h3>
    </div>
    <div class="slider-list">
      <div id="recommendationsCarousel" class="carousel">
        <div class="slider-inner"></div>
      </div>
    </div>
  `;

  const sliderInner = movieListElem.querySelector(".slider-inner");

  for (const movie of movieList) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <a href="moviedetails.html?id=${movie.id}">
        <img src="${imageBaseUrl}w342${movie.poster_path}" alt="${movie.title}" class="img-cover">
        <p class="movie-title">${movie.title}</p>
      </a>
    `;

    sliderInner.appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);

  const selector = "#recommendationsCarousel .slider-inner";
  if (document.querySelector(selector)) {
    initSlider(selector);
  }
};

document.addEventListener("DOMContentLoaded", fetchAndDisplayMovieDetails);
