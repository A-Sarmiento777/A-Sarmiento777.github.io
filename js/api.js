
class Omdb {

    apiKey = '75f9489e';
    URL = `https://www.omdbapi.com/?apikey=` + this.apiKey;

    getMovies(name, year, type ){
        let url = this.URL + `&s=` + name + (year ? '&y=' + year : '') + (type ? '&type=' + type : '')
        return fetch(url)
    }

    getMovie(id){
        return fetch(this.URL + `&i=` + id)
    }

}