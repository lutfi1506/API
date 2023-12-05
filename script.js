// // fetch
// const search = document.querySelector('.search-button');
// search.addEventListener('click',function(){
//   const inputKeyword = document.querySelector('.input-keyword');
//   fetch('http://www.omdbapi.com/?apikey=165ec7ae&s=' + inputKeyword.value)
//       .then(response => response.json())
//       .then(response => {
//          const movies = response.Search;
//          let cards = '';
//          movies.forEach(m => cards += showMovie(m));
//          const movieContainer = document.querySelector('.movie-container');
//          movieContainer.innerHTML = cards;

//          const modalButton = document.querySelectorAll('.modal-detail-button');
//          modalButton.forEach(btn => {
//             btn.addEventListener('click',function(){
//                const imdbid = this.dataset.imdbid;
//                console.log(imdbid);
//                fetch('http://www.omdbapi.com/?apikey=165ec7ae&i=' + imdbid)
//                   .then(response => response.json())
//                   .then(m => {
//                      const movieDetail = showMovieDetail(m);
//                      const modalBody = document.querySelector('.modal-body');
//                      modalBody.innerHTML = movieDetail;
//                   })
//             })
//          })

//       })
// });

const search = document.querySelector(".search-button");
search.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetails(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=165ec7ae&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showMovie(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function getMovieDetails(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=165ec7ae&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showMovie(m) {
  return `<div class="col-md-4 my-5">
            <div class="card">
               <img src="${m.Poster}" class="card-img-top">
               <div class="card-body">
                  <h5 class="card-title">${m.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                  <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}"> Show details </a>
               </div>
            </div>
         </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
               <div class="row">
                  <div class="col-md-3">
                     <img src="${m.Poster}" class="img-fluid">
                  </div>
                  <div class="col-md">
                     <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                        <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                        <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                        <li class="list-group-item"><Strong>Writer :</Strong> ${m.Writer} </li>
                        <li class="list-group-item"><strong>Plot :</strong><br>${m.Plot}</li>
                     </ul>
                  </div>
               </div>
            </div>`;
}
