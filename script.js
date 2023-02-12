const API_KEY = "api_key=c63a05f546a402ef30359ac88d0fd333";
const BASIC_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASIC_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SRCH_URL = BASIC_URL + "/search/movie?" + API_KEY;

const container = document.querySelector(".container");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

// sidebar

const tagEle = document.querySelector("#tag");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let result;
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())

    .then((data) => {
      //console.log(data);
      showMovies(data.results);
      result = data.results;
    });
}

function showMovies(data) {
  container.innerHTML = "";
  data.forEach((movie) => {
    const {
      title,
      poster_path,
      overview,
      original_language,
      vote_average,
      id,
    } = movie;

    const cardholder = document.createElement("div");
    cardholder.classList.add("card");
    cardholder.innerHTML = `
        <div class="img-container">
             <img class="card-img" src="${
               IMG_URL + poster_path
             }" alt="${title}" onclick="popUp(this,${id})">
         </div>
         <div class="title">
            <h2 class="mov-title">${title}</h2>
         </div>
         <div class="lan-rating">
             <p class="language">${original_language}</p>
             <p class="rating ${ratingColor(vote_average)}">${vote_average}</p>
         </div>
        `;

    container.appendChild(cardholder);
  });
}

function ratingColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searTerm = search.value;

  //console.log(searTerm);

  if (searTerm) {
    getMovies(SRCH_URL + "&query=" + searTerm);
  }
});

// genre setting code

setGenre();
var selGenre = [];

function setGenre() {
  tagEle.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selGenre.length == 0) {
        selGenre.push(genre.id);
      } else {
        if (selGenre.includes(genre.id)) {
          selGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selGenre.splice(idx, 1);
            }
          });
        } else {
          selGenre.push(genre.id);
        }
      }
      //console.log(selGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selGenre.join(",")));
      highlightGenre();
    });
    tagEle.append(t);
  });
}

//sectect genre
function highlightGenre() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlighted");
  });
  if (selGenre.lenght != 0) {
    selGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlighted");
    });
  }
}

// modal script
const modal= document.querySelector(".pop-modal");
const popClose = document.querySelector(".pop-close")

function popUp(url, id) {
  modal.style.display = "block";
  // console.log(result);
  for (let item of result) {
    if (item.id === id) {
      document.querySelector(".pop-img").src = IMG_URL + item.poster_path;

      document.querySelector(".pop-title").innerText = item.title;
      //console.log(item.title);
      document.querySelector("#rating-num").innerText = item.vote_average + "/10";
      document.querySelector(".pop-languages").innerText = item.original_language;

      document.querySelector(".pop-dec").innerText = item.overview;
      let price = Math.floor(250 + Math.random() * 300);
      document.querySelector(".price-num").innerHTML = price;
      // `
      //      <div id="ticket-container">
      //               <p id="ticket-price"><span id="price">₹ &nbsp${price}</span></p>
      //               <button id="buy-button">Buy Ticket</button>
      //           </div>
      //           </div>`;
      //    document.getElementById('price').innerText=price;
      document.querySelector("#booking").innerHTML = `<button class="pop-add-to-cart" id="buy-button">Book Tickets</button>`;
      var genre = item.genre_ids;
      //    document.getElementById('genre').innerText=item.title;
     // console.log(item.title);
      document.getElementById('buy-button').addEventListener("click", function() {
        
        window.location.href=`checkout.html?price=${price}&title=${item.title}`;
      });
    }
  }
}
// When the user clicks on <span> (x), close the modal
popClose.onclick = ()=> {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// For mobile and Tablet navigation

const mobileIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const movieContainer = document.querySelector(".container");

mobileIcon.addEventListener('click',(e)=> {
  e.preventDefault;
  sidebar.classList.toggle("s-visible");
  movieContainer.classList.toggle("s-hidden");

})
