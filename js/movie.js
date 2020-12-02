
const apis = new Omdb()
const titulo = document.querySelector('.title')
const container = document.querySelector('.container')

window.onload = function() {
    document.title = localStorage.getItem('movieTitle') || 'movie'
    titulo.textContent = localStorage.getItem('movieTitle') || 'movie'
}

apis.getMovie(localStorage.getItem('movieId'))
.then(function(data) {
    return data.json()
})
.then(function(base){

    console.log(base)

    const movie = document.createElement('article')
            movie.className = 'movieContainer'

            movie.innerHTML = `
                <div class="movie-content">
                    <h2>` + base.Title + `</h2><br>
                    <i>` + base.Year + `</i><br>
                    <i>` + base.Type + `</i><br>
                    <br>
                    <hr>
                    <br>
                    <p><big>Actors:</big>` + base.Actors + `</p>
                    <br><br>
                    <p>` + base.Plot + `</p>
                </div>
                <img class="img" src="` + (base.Poster != 'N/A' ? base.Poster : './../assets/default.png') + `" alt="imagen">
            `
    container.appendChild(movie)

})