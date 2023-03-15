const searchBtn = document.getElementById("search-btn");
const searchInp = document.getElementById("search-input");
const moviesSection = document.getElementById("movies-section");

function getMovieList() {
  fetch(`http://www.omdbapi.com/?s=${searchInp.value}=&apikey=d3abac8f`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getMovieHtml(data.Search);
    })
    .catch(() => {
      console.error("errorororooror");
    });
}

searchBtn.addEventListener("click", getMovieList);

function getMovieHtml(data) {
  for (let item of data) {
    fetch(`https://www.omdbapi.com/?t=${item.Title}=&apikey=d3abac8f`)
      .then((res) => res.json())
      .then((MovieData) => {
        console.log(MovieData);

        let movieCardHtml = ``;

        movieCardHtml = `
        <div  id="movie-card" class="movie-card">
                            <img src="${MovieData.Poster}"
                                alt="">

                            <div class="movie-detail">
                                <div class="movie-title flex">
                                    <h1 class="title">${MovieData.Title}</h1>
                                    <div class="rating-div">
                                        <img src="assets/star-icon.svg" alt="star icon" width="10">
                                        <span class="rating" id="rating">${MovieData.imdbRating}</span>
                                    </div>
                                </div>
                                            
                                <div class="movie-sub-title flex">
                                    <span>
                                        ${MovieData.Runtime}
                                    </span>
                                    <span>
                                        ${MovieData.Genre}
                                    </span>
                                    <span class="watchlist-btn" id="watchlist-btn">
                                        <img src="assets/plus-icon.svg" alt="+ icon" srcset=""> Watchlist
                                    </span>
                                </div>

                                <div class="movie-body flex">
                                    <span>
                                        ${MovieData.Plot}
                                    </span>
                                </div>

                            </div>
        `;
        moviesSection.innerHTML += movieCardHtml;
        searchInp.value = ``
      });
  }
}
