/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */

/**
* According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
* 1 Required parameter: apikey
* 2 Required parameter: One of the following i=, t= or s=
*
* 
* Example with parameter s=star trek
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
*
* Example with parameter s=star trek AND y=2020
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
*
* Example with parameter s=star trek AND type=series
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=2020
*
*/

const apis = new Omdb()

const year = document.getElementById('year-input')
const nameMovie = document.getElementById('input-search')
const typeMovie = document.getElementById('type-input')
const container = document.getElementById('container')
const btnSearch = document.getElementById('find')


window.addEventListener('load', function(){

    for(let i = 2020; i > 1939; i-- ) {

        let option = document.createElement('option')
        option.setAttribute('value', i)
        option.textContent = i
        year.appendChild(option)

    }

})

async function fetchData(name, year, type) {

    container.innerHTML = ''

    let response = await apis.getMovies(name, year, type);
    let data     = await response.json();

    if (data.Search){

        for(let base of data['Search']){

            const movie = document.createElement('article')
            movie.className = 'movieContainer'

            movie.innerHTML = `
                <div class="movie-content">
                    <h2>` + base.Title + `</h2><br>
                    <i>` + base.Year + `</i><br>
                    <i>` + base.Type + `</i><br>
                </div>
                <img class="img" src="` + (base.Poster != 'N/A' ? base.Poster : './../assets/default.png') + `" alt="imagen">
            `
            container.appendChild(movie)

            movie.addEventListener('click', function(){
                localStorage.setItem('movieId', base.imdbID)
                localStorage.setItem('movieTitle', base.Title)
                window.location.replace('movie.html')
            })
        }

    } else container.innerHTML = '<h1>Try a different search</h1>'
   
}

btnSearch.addEventListener('click', function(){ fetchData(nameMovie.value, year.value, typeMovie.value) })

 