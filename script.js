const API_KEY = 'api_key=c63a05f546a402ef30359ac88d0fd333';
const BASIC_URL = 'https://api.themoviedb.org/3';
const API_URL = BASIC_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SRCH_URL = BASIC_URL + '/search/movie?'+API_KEY

const container = document.querySelector(".container");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

getMovies(API_URL)
function getMovies(url){
    fetch(url)
    .then(res => res.json())

    .then(data => {
        console.log(data);  
        showMovies(data.results);
    })
}

function showMovies(data){

    container.innerHTML = '';
    data.forEach(movie => {

        const {title, poster_path, overview, original_language, vote_average} = movie;

        const cardholder = document.createElement('div');
        cardholder.classList.add('card');
        cardholder.innerHTML=  `
        <div class="img-container">
             <img class="card-img" src="${IMG_URL+poster_path}" alt="${title}">
         </div>
         <div class="title">
            <h2 class="mov-title">${title}</h2>
         </div>
         <div class="lan-rating">
             <p class="language">${original_language}</p>
             <p class="rating ${ratingColor(vote_average)}">${vote_average}</p>
         </div>
        `

        container.appendChild(cardholder);
    });
}

function ratingColor(vote){
    if(vote >= 8){
        return "green";
    }
    else if(vote >= 5){
        return "orange";
    }
    else{
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searTerm = search.value;

    console.log(searTerm);

    if(searTerm){
        getMovies(SRCH_URL+'&query='+searTerm)
    }
})
