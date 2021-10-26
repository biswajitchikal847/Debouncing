//search Movies => done

var timerId;

let movies_div = document.getElementById("movies");

let movie_input = document.getElementById("movie");




async function searchMovies(movie_name) {
    try {
        let res = await fetch(`https://www.omdbapi.com/?apikey=65714494&s=${movie_name}`);
        let data = await res.json();
        // console.log("data:",data);
        return data;
    }
    catch (e) {
        console.log("e:", e)
    }

}

// searchMovies("inception");

function appendMovies(movies) {

    if (movies === undefined) {
        return false;
    }
    movies_div.innerHTML = null;

    movies.forEach(function (movie) {
        let p = document.createElement("p");
        let image = document.createElement("img");
        image.src = movie.Poster;

        let inner_div = document.createElement("div");

       
        p.innerText = "Name - " +movie.Title;
        p.style.backgroundColor = "aqua";
        p.style.color ="black";
        inner_div.append(image,p)
        movies_div.append(inner_div);


       
    });

}

// function showDetails(p,movie){
//     let movie_details = document.getElementById("details");
//     if(p == movies.Title){
//         movie_details.append(movie.Year,movie.Title);
//     }
// }

async function main() {
    let name = document.getElementById("movie").value;

    //get search movies

    if (name.length < 3) {
       
        movies_div.style.display ="none";
        return false;
    }else{

    movies_div.style.display = "block";
}

    let res = await searchMovies(name);
    let movie_data = res.Search;
    
    appendMovies(movie_data);
    console.log("res---", movie_data);
}


function debounce(func, delay) {

    //lets take about A
    //func = main()

    //ave = setTimeout -  func - main- searchMovie("ave")
    //aven - clear the previous timeout - setTimeout - func - main- searchMovie("ave")

    if (timerId) {
        clearTimeout(timerId);
    }


    timerId = setTimeout(function () {

        func();

    }, delay);

}


function clickbody(){
    
    movies_div.style.display = "none";
   
}
function showdiv(){
movies_div.style.display = "block";
}