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


        inner_div.addEventListener("click", function () {
            // p.style.color = "red";
            console.log("acccs:", movie);
            var movie_details = document.getElementById("details");

            movie_details.innerText = null;



            imb(movie.imdbID);

            async function imb(IMDbId) {
                let res = await fetch(`http://www.omdbapi.com/?i=${IMDbId}&apikey=65714494`);
                let data = await res.json();
                console.log("data---", data);

                let left = document.createElement("div");
                let right = document.createElement("div");

                let img = document.createElement("img");

                img.src = data.Poster;

                left.append(img);

                let name = document.createElement("p");

                name.innerText = "Title: " + data.Title;

                name.setAttribute("style", "font-size:20px; font-weight:bold; color: #E64A19")

                let DVD = document.createElement("p");

                DVD.innerText = "Year: " + data.DVD;

                let imdbID = document.createElement("p");
                imdbID.setAttribute("style", "color:#FFD600;");
                imdbID.innerText = "Rating: " + data.imdbRating + "*";

                let Language = document.createElement("p");

                Language.innerText = "Language: " + data.Language;

                let Runtime = document.createElement("p");

                Runtime.innerText = "Runtime: " + data.Runtime;

                right.append(name, DVD, Language, imdbID, Runtime);
                movie_details.append(left, right);
            }



        });
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